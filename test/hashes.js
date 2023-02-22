import { expect } from 'chai'
import helpers from './helpers/index.js'

import AVVY from '../src/index.js'

const TEST_NAME = 'avvy-client-common-testing.avax'

describe('Hashes', async () => {
  let avvy
  let hash
  let provider

  beforeEach(async () => {
    provider = await helpers.buildEthersProvider('JsonRpcProvider', ['http://localhost:8545'])
    avvy = new AVVY(provider, {
      chainId: 31337
    })
    hash = await avvy.utils.nameHash(TEST_NAME)
  })

  it('should reverse the hash if preimage revealed', async () => {
    const name = await avvy.hash(hash).lookup()
    expect(name.name).to.equal(TEST_NAME)
  })

  it('should return null if preimage not revealed', async () => {
    const name = await avvy.hash(1).lookup()
    expect(name).to.be.null
  })
})
