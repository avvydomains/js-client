// These functions are meant to wrap an ethers or a web3 provider to 
// configure native resolution in those libraries.
const providers = function (AVVY) {
  return {
    ethersProvider: function (provider, config) {
      const defaultConfig = {
        chainId: 43114
      }
      if (!config) config = defaultConfig 
      for (let key in defaultConfig) {
        if (!config[key]) config[key] = defaultConfig[key]
      }

      const avvy = new AVVY(provider, {
        chainId: config.chainId
      })

      const _lookupAddress = provider.lookupAddress
      const _resolveName = provider.resolveName

      provider.lookupAddress = async (address) => {
        address = await address // can accept promises

        const output = await avvy.batch([address]).reverseToNames(avvy.RECORDS.EVM)
        if (output[0]) return output[0]

        return _lookupAddress(address)
      }

      provider.resolveName = async (name) => {
        name = await name // can accept promises

        if (typeof name === 'string' && name.toLowerCase().endsWith('.avax')) {
          let _name = await avvy.name(name).resolve(avvy.RECORDS.EVM)
          return _name
        } 

        return _resolveName.call(provider, name)
      }

      return provider
    }
  }
}

export default providers
