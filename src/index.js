import _contracts from './contracts.js'
import records from './records.js'
import utils from './utils.js'

const ethersProvider = function (provider, chainId) {
  const contractLoader = _contracts.ethersLoader(provider, chainId)
  const contracts = contractLoader.getContracts(provider, chainId)

  return {
    contracts,
    getExpiry: async (hash) => {
      const expiry = await contracts.Domain.getDomainExpiry(hash)
      return parseInt(expiry.toString())
    },
    lookupHash: async (hash) => {
      const result = await contracts.RainbowTableV1.lookup(hash)
      return result
    },
    getResolver: async (domain, hash) => {
      const resolver = await contracts.ResolverRegistryV1.get(domain, hash)
      return resolver
    },
    resolveStandard: async (resolverAddress, datasetId, hash, key) => {
      const resolverContract = contractLoader.getResolverContract(resolverAddress)
      const result = await resolverContract.resolveStandard(datasetId, hash, key)
      return result
    },
    resolve: async (resolverAddress, datasetId, hash, key) => {
      const resolverContract = contractLoader.getResolverContract(resolverAddress)
      const result = await resolverContract.resolve(datasetId, hash, key)
      return result
    },
    reverseResolveEVM: async (key, value) => {
      const address = await contracts.ReverseResolverRegistryV1.getResolver(key)
      const contract = contractLoader.getEVMReverseResolverContract(address)
      return await contract.get(value)
    },
    getReverseResolverAddress: async (key) => {
      return await contracts.ReverseResolverRegistryV1.getResolver(key)
    },
    poseidon: async (num) => {
      return await contracts.Poseidon['poseidon(uint256[3])'](num)
    }
  }
}
const AVVY = function (_provider, _opts) {

  // optionally pass chainId
  const opts = _opts || {}
  const chainId = opts.chainId || 43114
  
  // we'll support ethers for now. later,
  // we can add support for web3
  const provider = ethersProvider(_provider, chainId)

  // pre-cache hash for "avax" TLD
  const providerPoseidonCache = {
    '0': {
      '2019653217': {
        '0': 4272832630669137235923015693490068373911885005413996126751674003559469537065n
      }
    }
  }
  let providerPoseidonCacheSize = 1
  const providerPoseidon = async (num) => {
    const n1 = num[0].toString()
    const n2 = num[1].toString()
    const n3 = num[2].toString()
    if ((n1 in providerPoseidonCache)
        && (n2 in providerPoseidonCache[n1])
        && (n3 in providerPoseidonCache[n1][n2])) {
      return providerPoseidonCache[n1][n2][n3]
    }
    const bignum = await provider.poseidon(num)
    const result = bignum.toBigInt()
    if (!(n1 in providerPoseidonCache)) providerPoseidonCache[n1] = {}
    if (!(n2 in providerPoseidonCache[n1])) providerPoseidonCache[n1][n2] = {}
    providerPoseidonCache[n1][n2][n3] = result
    providerPoseidonCacheSize += 1
    return result
  }
  const _utils = utils(opts.poseidon || providerPoseidon)

  // represents a Name in the system
  const Name = function (name, provider) {

    // lowercase the name. if someone passes in NAME.avax
    // that is equivalent to name.avax
    name = name.toLowerCase()

    // the namespace is the first label of a name
    const getNamespace = async () => {
      const split = name.split('.')
      split.reverse()
      const namespace = split[0]
      const hash = await _utils.nameHash(namespace)
      return {
        namespace,
        hash
      }
    }

    // the domain is the first two labels of the name (namespace, and the next label)
    const getDomain = async () => {
      const split = name.split('.')
      split.reverse()
      const _domain = split.slice(0, 2)
      _domain.reverse()
      const domain = _domain.join('.')
      const hash = await _utils.nameHash(domain)
      return {
        domain,
        hash
      }
    }

    return {
      name,
      resolve: async (key) => {
        let resolveMethod
        
        // standard keys are numeric
        if (typeof key == 'number') {
          if (records._standardKeyList.indexOf(key) === -1) {
            throw `Unknown numeric key ${key} passed to resolve(). If you wish to use a custom key, pass a string.`
          }
          resolveMethod = provider.resolveStandard
        } 
        
        // custom keys are strings
        else if (typeof key === 'string') {
          resolveMethod = provider.resolve
        }

        else {
          throw "Unknown key type passed to resolve()"
        }

        let domain = await getDomain() // this is the domain with 2 labels, e.g. name.avax
        let nameHash = await _utils.nameHash(name)
        let expiresAt = await provider.getExpiry(domain.hash)
        if (expiresAt === 0) {
          throw "Domain has not been registered"
        }
        const now = parseInt(Date.now() / 1000)
        if (now >= expiresAt) {
          throw "Domain registration is expired"
        }

        // find the active resolver
        // for a name aaa.bbb.ccc.avax, we must
        // check for a resolver set at:
        // - aaa.bbb.ccc.avax
        // - bbb.ccc.avax
        // - ccc.avax
        // the resolver set at the longest subdomain is the one to use
        let split = name.split('.')
        let resolver
        while (split.length >= 2) {
          let subdomain = split.join('.')
          let hash = await _utils.nameHash(subdomain)
          try {
            resolver = await provider.getResolver(domain.hash, hash)
            break
          } catch (err) {}
          split = split.slice(1)
        }

        if (!resolver) throw "No resolver set"

        // fetch the value
        return await resolveMethod(resolver.resolver, resolver.datasetId, nameHash, key)
      },
    }
  }

  // represents the hash of a Name in the system
  const Hash = function (hash, provider) {
    
    // attempt to look up the hash from the API
    const lookup = async () => {
      let signal
      try {
        signal = await provider.lookupHash(hash)
      } catch (err) {
        // hash not revealed
        return null
      }
      const preimage = await _utils.decodeNameHashInputSignals(signal)
      return Name(preimage, provider)
    }

    return {
      hash,
      lookup,
    }
  }


  const name = (n) => {
    return Name(n, provider)
  }

  const hash = (h) => {
    return Hash(h, provider)
  }

  const reverse = async (key, value) => {
    let method
    switch (key) {
      case records.EVM:
        method = provider.reverseResolveEVM
        break
    }
    if (!method) throw "Reverse resolver is not implemented for this standard key"
    let result
    try {
      result = await method(key, value)
    } catch (err) {
      return null
    }
    return Hash(result.hash, provider)
  }
  
  return {
    name,
    hash,
    reverse,
    contracts: provider.contracts,

    utils: _utils,
    RECORDS: records,
  }
}

AVVY.RECORDS = records

export default AVVY
