import _contracts from '../lib/contracts/index.js'

const ethersLoader = async (signerOrProvider, chainId) => {
  if (!_contracts[chainId]) throw `Contracts not found for chainId ${chainId}`
  const ethers = await import('#ethers')
  const contractData = _contracts[chainId]
  const contracts = {}
  for (let key in contractData.contracts) {
    contracts[key] = new ethers.Contract(
      contractData.contracts[key].address,
      contractData.contracts[key].abi,
      signerOrProvider
    )
  }

  return {
    getContracts: () => {
      return contracts
    },

    getResolverContract: (address) => {
      const iface = contracts.PublicResolverV1.interface
      return new ethers.Contract(
        address,
        iface,
        signerOrProvider
      )
    },

    getEVMReverseResolverContract: (address) => {
      const iface = contracts.EVMReverseResolverV1.interface
      return new ethers.Contract(
        address,
        iface,
        signerOrProvider
      )
    }
  }
}


function Web3ContractMethod(contract, abi, address) {
  const func = async (...args) => {
    return await contract.methods[abi.name](...args).call()
  }
  func.abi = abi
  func.populateTransaction = async (...args) => {
    const data =  await contract.methods[abi.name](...args).encodeABI()
    return {
      to: address,
      data
    }
  }
  func.staticCall = async (...args) => {
    return await contract.methods[abi.name](...args).call()
  }
  return func
}

class Web3ContractAdapter {
  constructor(provider, abi, address) {
    this.contract = new provider.eth.Contract(
      abi,
      address
    )

    this.abi = abi
    this.address = address

    this.interface = {
      decodeFunctionResult: (methodName, responseData) => {
        const typesArray = this.__getTypesArray(methodName)
        const getOutputNames = this.__getOutputNames(methodName)
        const data = provider.eth.abi.decodeParameters(typesArray, responseData)
        getOutputNames.forEach((output, index) => {
          data[output] = data[index.toString()]
        })
        return data
      }
    }

    abi.map((contractMethodAbi) => {
      try {
        let name
        let contractMethod = Web3ContractMethod(this.contract, contractMethodAbi, address)

        // if we already assigned a method with the same name,
        // we need to treat it as overloaded
        if (this[contractMethodAbi.name]) {
          
          // if the previous assignment was not overloaded, then we need to
          // also treat the previous assignment as overloaded
          if (this[contractMethodAbi.name] !== this.__multipleDefinitions) {
            name = this.__getMethodNameWithArguments(this[contractMethodAbi.name].abi)
            this[name] = this[contractMethodAbi.name]
          }

          // we need to set up the new assignment
          name = this.__getMethodNameWithArguments(contractMethodAbi)
          this[name] = contractMethod

          // finally, set the method to throw an exception if
          // the user attempts to call it directly without
          // specifying the argument types
          this[contractMethodAbi.name] = this.__multipleDefinitions
        } else {
          this[contractMethodAbi.name] = contractMethod
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  __getABIForMethod = (methodName) => {
    const nameWithArguments = this.__getMethodNameWithArguments(this[methodName].abi)
    const abi = this[nameWithArguments] ? this[nameWithArguments].abi : this[methodName].abi
    return abi
  }

  __getTypesArray = (methodName) => {
    const abi = this.__getABIForMethod(methodName)
    return abi.outputs.map((output) => output.type)
  }

  __getOutputNames = (methodName) => {
    const abi = this.__getABIForMethod(methodName)
    return abi.outputs.map((output) => output.name)
  }

  __getMethodNameWithArguments = (methodAbi) => {
    // returns the method name with arguments, as ethers
    // uses for overloaded functions
    const args = methodAbi.inputs.map((input) => input.type).join(',')
    return `${methodAbi.name}(${args})`
  }

  __multipleDefinitions = () => {
    throw "This method has multiple definitions; access it like you would in ethers."
  }
}

const web3Loader = async (provider, chainId) => {
  if (!_contracts[chainId]) throw `Contracts not found for chainId ${chainId}`
  const contractData = _contracts[chainId]
  const contracts = {}
  for (let key in contractData.contracts) {
    contracts[key] = new Web3ContractAdapter(
      provider,
      contractData.contracts[key].abi,
      contractData.contracts[key].address,
    )
  }

  return {
    getContracts: () => {
      return contracts
    },

    getResolverContract: (address) => {
      const iface = contracts.PublicResolverV1.interface
      return new Web3ContractAdapter(
        provider,
        contracts.PublicResolverV1.abi,
        address
      )
    },

    getEVMReverseResolverContract: (address) => {
      const iface = contracts.EVMReverseResolverV1.interface
      return new Web3ContractAdapter(
        provider,
        contracts.EVMReverseResolverV1.abi,
        address
      )
    }
  }
}

export default {
  ethersLoader,
  web3Loader
}
