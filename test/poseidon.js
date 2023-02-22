import { expect } from 'chai'
import helpers from './helpers/index.js'
import crypto from 'crypto'
import { buildPoseidon } from 'circomlibjs/src/poseidon_wasm.js'

import AVVY from '../src/index.js'

const TEST_NAME = 'avvy-client-common-testing.avax'

describe('Poseidon', async () => {
  let provider

  beforeEach(async () => {
    provider = await helpers.buildEthersProvider('JsonRpcProvider', ['http://localhost:8545'])
  })

  it('should use default poseidon if user does not fill', async () => {
    const avvy = new AVVY(provider, {
      chainId: 31337,
    })
    const hash = await avvy.utils.nameHash(TEST_NAME)
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

  it('should handle instantiation without options', async () => {
    const _provider = await helpers.buildEthersProvider('JsonRpcProvider', ['https://api.avax.network/ext/bc/C/rpc'])
    const avvy = new AVVY(_provider)
    const hash = await avvy.utils.nameHash(TEST_NAME)
    expect(hash.toString()).to.equal('5009886810970053750228119498024191690423831754312784118430229935127343039646')
  })

  it('should allow user to patch in circomlibjs / poseidon', async () => {
    let poseidon = await buildPoseidon()
    let executed = false
    const avvy = new AVVY(provider, {
      chainId: 31337,
      poseidon: async (num) => {
        const arr = poseidon(num)
        executed = true
        return poseidon.F.toObject(arr)
      }
    })
    const hash = await avvy.utils.nameHash(TEST_NAME)
    expect(hash.toString()).to.equal('5009886810970053750228119498024191690423831754312784118430229935127343039646')
  })

  it('should calculate the same hashes when using circomlibjs vs contract', async () => {
    let poseidon = await buildPoseidon()
    const a1 = new AVVY(provider, {
      chainId: 31337,
    })
    const a2 = new AVVY(provider, {
      chainId: 31337,
      poseidon: async (num) => {
        const arr = poseidon(num)
        return poseidon.F.toObject(arr)
      }
    })

    for (let i = 0; i < 100; i += 1) {
      let name = crypto.randomBytes(10).toString('hex') + '.avax'
      let h1 = await a1.utils.nameHash(name)
      let h2 = await a2.utils.nameHash(name)
      expect(h1).to.equal(h2)
    }
  })
})
