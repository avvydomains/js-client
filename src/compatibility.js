// these methods are here to help handle version changes in 
// ethers & web3.js 

const compatibility = {
  ethers: {

    // see https://docs.ethers.org/v6/migrating/#migrate-contracts
    _methodOperation: (contract, methodName, operationName, args) => {
      const isV5 = Object.keys(contract).indexOf('populateTransaction') > -1
      if (isV5) {
        if (operationName === 'staticCall') {
          operationName = 'callStatic'
        }
        return contract[operationName][methodName](...args)
      } else {
        return contract[methodName][operationName](...args)
      }
    },

    populateTransaction: (contract, methodName, args) => {
      return compatibility.ethers._methodOperation(contract, methodName, 'populateTransaction', args)
    },

    staticCall: (contract, methodName, args) => {
      return compatibility.ethers._methodOperation(contract, methodName, 'staticCall', args)
    }
  }
}

export default compatibility
