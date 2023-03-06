
const funcs = {
  // returns ethers v5 / v6 depending on which test suite we're running.
  getEthers: async () => {
    return await import('#ethers')
  },

  // returns web3; future can return different versions
  getWeb3: async () => {
    return await import('web3')
  },

  // compat with ethers v5 and v6
  buildEthersProvider: async (providerName, args) => {
    const ethers = await funcs.getEthers()
    let provider
    if (ethers.providers) provider = ethers.providers[providerName]
    else provider = ethers[providerName]
    return new provider(...args)
  },

  // compat with web3
  buildWeb3Provider: async (providerName, args) => {
    const Web3 = (await funcs.getWeb3()).default
    let provider = new Web3.providers[providerName](...args)
    return new Web3(provider)
  },

  fetchJson: async (url, params) => {
    const ethers = await funcs.getEthers()
    let utils
    if (ethers.utils) {
      
      // v5
      utils = ethers.utils
      return utils.fetchJson(url, params)

    } else {

      // v6
      utils = await import('ethers/utils')
      let req = new utils.FetchRequest(url)
      req.body = params
      let res = await req.send()
      return res.bodyJson
    }
  },

  buildProvider: async (type, rpcUrl) => {
    let provider
    let lib = process.env.ETH_LIB
    switch (type) {
      case "HTTP":
        if (lib === 'ethers') {
          provider = await funcs.buildEthersProvider('JsonRpcProvider', [rpcUrl])
        } else if (lib === 'web3') {
          provider = await funcs.buildWeb3Provider('HttpProvider', [rpcUrl])
        }
        return provider

      default:
        throw "Provider type unknown: " + type
    }
  }
}

export default funcs
