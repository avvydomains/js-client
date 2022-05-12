import { expect } from 'chai'
import { ethers } from 'ethers'

import AVVY from '../src/index.js'

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

describe('Contracts', async () => {
  let avvy

  beforeEach(async () => {
    avvy = new AVVY(provider, {
      chainId: 31337
    })
  })

  it('should provide contracts ', async () => {
    const contracts = Object.keys(avvy.contracts)
    expect(contracts.indexOf('ContractRegistryV1')).to.not.equal(-1)
  })
})
