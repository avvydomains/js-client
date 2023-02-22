import { expect } from 'chai'
import helpers from './helpers/index.js'

import AVVY from '../src/index.js'

const TEST_NAME = 'avvy-client-common-reverse.avax'
const REVERSE_TEST_PUBKEY = '0x650197C550B00fdD74C0F533cAf877dD39F79270'
const REVERSE_TEST_PUBKEY_NOT_SET = '0x18f4Cc86D27655A6C907B79ed65a82085D5D1A43'

describe('Reverse', async () => {
  let avvy
  let provider

  beforeEach(async () => {
    provider = await helpers.buildEthersProvider('JsonRpcProvider', ['http://localhost:8545'])
    avvy = new AVVY(provider, {
      chainId: 31337
    })
  })

  it('should reverse resolve into the hash', async () => {
    const hash = await avvy.reverse(AVVY.RECORDS.EVM, REVERSE_TEST_PUBKEY)
    const expected = await avvy.utils.nameHash(TEST_NAME)
    expect(hash.hash.toString()).to.equal(expected.toString())
  })

  it('should be able to look up the preimage', async () => {
    const hash = await avvy.reverse(AVVY.RECORDS.EVM, REVERSE_TEST_PUBKEY)
    const name = await hash.lookup()
    expect(name.name).to.equal(TEST_NAME)
  })

  it('should fail if key has no reverse resolver', async () => {
    await expect(avvy.reverse(AVVY.RECORDS.X_CHAIN, REVERSE_TEST_PUBKEY)).to.throw
  })

  it('should fail gracefully if reverse is not found', async () => {
    const output = await avvy.reverse(AVVY.RECORDS.EVM, REVERSE_TEST_PUBKEY_NOT_SET)
    await expect(output).to.be.null
  })
})
