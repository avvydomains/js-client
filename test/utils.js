import { expect } from 'chai'
import helpers from './helpers/index.js'

import AVVY from '../src/index.js'

const TEST_NAME = 'avvy-client-common-testing.avax'

describe('Utils', async () => {
  let avvy
  let provider

  beforeEach(async () => {
    provider = await helpers.buildProvider('HTTP', 'http://localhost:8545')
    avvy = new AVVY(provider, {
      chainId: 31337
    })
  })

  it('should generate name & path', async () => {
    const { name, path } = await avvy.utils.generateNameAndPath(TEST_NAME)
    const hash = await avvy.utils.nameHash(TEST_NAME)
    const sigs = (await avvy.utils.encodeNameHashInputSignals(TEST_NAME)).slice(4)
    expect(name).to.equal(hash)
    for (let i = 0; i < path.length; i += 1) {
      expect(path[i].toString()).to.equal(sigs[i].toString())
    }
  })
})
