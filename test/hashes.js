import { expect } from 'chai'
import { ethers } from 'ethers'

import AVVY from '../src/index.js'

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
const TEST_NAME = 'avvy-client-common-testing.avax'

describe('Hashes', async () => {
  let avvy
  let hash

  beforeEach(async () => {
    avvy = new AVVY(provider, {
      chainId: 31337
    })
    hash = await AVVY.utils.nameHash(TEST_NAME)
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
