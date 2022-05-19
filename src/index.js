import blocklist from './blocklist.js'
import _contracts from './contracts.js'
import records from './records.js'
import utils from './utils.js'

const ethersProvider = function (provider, chainId) {
  const contractLoader = _contracts.ethersLoader(provider, chainId)
  const contracts = contractLoader.getContracts(provider, chainId)

  return {
    contracts,
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
    }
  }
}

// represents a Name in the system
const Name = function (name, provider) {

  // the namespace is the first label of a name
  const getNamespace = async () => {
    const split = name.split('.')
    split.reverse()
    const namespace = split[0]
    const hash = await utils.nameHash(namespace)
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
    const hash = await utils.nameHash(domain)
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

      // fetch data from the chain
      const domain = await getDomain()
      const hash = await utils.nameHash(name)
      const resolver = await provider.getResolver(domain.hash, hash)
      const value = await resolveMethod(resolver.resolver, resolver.datasetId, hash, key)
      return value
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
    const preimage = await utils.decodeNameHashInputSignals(signal)
    return Name(preimage, provider)
  }

  return {
    lookup,
  }
}

const AVVY = function (_provider, _opts) {

  // optionally pass chainId
  const opts = _opts || {}
  const chainId = opts.chainId || 43114
  
  // we'll support ethers for now. later,
  // we can add support for web3
  const provider = ethersProvider(_provider, chainId)

  const name = (n) => {
    return Name(n, provider)
  }

  const hash = (h) => {
    return Hash(h, provider)
  }
  
  return {
    name,
    hash,
    contracts: provider.contracts,

    blocklist,
    utils,
    RECORDS: records,
  }
}

AVVY.blocklist = blocklist
AVVY.RECORDS = records
AVVY.utils = utils

export default AVVY
