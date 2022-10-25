import { expect } from 'chai'
import { ethers } from 'ethers'

import AVVY from '../src/index.js'

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
const TEST_NAME = 'avvy-client-common-testing.avax'

describe('Utils', async () => {
  it('should use default poseidon if user does not fill', async () => {
    const avvy = new AVVY(provider, {
      chainId: 31337,
    })
    const hash = await AVVY.utils.nameHash(TEST_NAME)
    expect(hash.toString()).to.equal('5009886810970053750228119498024191690423831754312784118430229935127343039646')
  })

  it('should let the user insert their own poseidon function', async () => {
    const avvy = new AVVY(provider, {
      chainId: 31337,
      poseidon: async (num) => {
        return 0
      }
    })
    const hash = await avvy.utils.nameHash(TEST_NAME)
    expect(hash).to.equal(0)
  })
})
