import { expect } from 'chai'
import helpers from './helpers/index.js'

import AVVY from '../src/index.js'

const TEST_NAME = 'avvy-client-common-testing.avax'

describe('Wallet', async () => {
  let avvy
  let provider

  beforeEach(async () => {
    provider = await helpers.buildProvider('HTTP', 'http://localhost:8545')
    avvy = new AVVY(provider, {
      chainId: 31337
    })
  })

  it('should get names', async () => {
    const hash = await avvy.utils.nameHash(TEST_NAME)
    const contracts = await avvy.contracts
    const owner = await contracts.Domain.ownerOf(hash)
    const domains = await avvy.wallet(owner).domains()
    const names = await avvy.batch(domains).lookup()
    expect(domains.length).to.equal(3)
    expect(names[0]).to.equal(TEST_NAME)
  })
})
