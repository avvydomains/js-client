import { expect } from 'chai'
import helpers from './helpers/index.js'

import AVVY from '../src/index.js'

describe('Contracts', async () => {
  let avvy
  let provider

  beforeEach(async () => {
    provider = await helpers.buildEthersProvider('JsonRpcProvider', ['http://localhost:8545'])
    avvy = new AVVY(provider, {
      chainId: 31337
    })
  })

  it('should provide contracts ', async () => {
    const _contracts = await avvy.contracts
    const contracts = Object.keys(_contracts)
    expect(contracts.indexOf('ContractRegistryV1')).to.not.equal(-1)
  })
})
