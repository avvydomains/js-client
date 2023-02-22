
const funcs = {
  // returns ethers v5 / v6 depending on which test suite we're running.
  getEthers: async () => {
    let ethers
    if (process.env.TEST_ETHERS_VERSION === '6') {
      ethers = await import('ethers6')
    } else {
      ethers = await import('ethers5')
    }
    return await import('#ethers')
    return ethers
  },

  // compat with ethers v5 and v6
  buildEthersProvider: async (providerName, args) => {
    const ethers = await funcs.getEthers()
    let provider
    if (ethers.providers) provider = ethers.providers[providerName]
    else provider = ethers[providerName]
    return new provider(...args)
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
  }
}

export default funcs
