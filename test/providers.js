import { expect } from 'chai'
import { ethers } from 'ethers'

import AVVY from '../src/index.js'

let provider

const TEST_NAME = 'sub.avvy-client-common-testing.avax'
const TEST_EXPECTED = '0x000000000000000000000000000000000000dead'
const TEST_NAME_REVERSE = 'avvy-client-common-reverse.avax'
const REVERSE_TEST_PUBKEY = '0x650197C550B00fdD74C0F533cAf877dD39F79270'
const REVERSE_TEST_PUBKEY_NOT_SET = '0x18f4Cc86D27655A6C907B79ed65a82085D5D1A43'

describe('Providers', async () => {
  let avvy

  describe('ethers', async () => {
    beforeEach(() => {
      provider = new AVVY.providers.ethersProvider(
        new ethers.providers.JsonRpcProvider('http://localhost:8545'),
        { chainId: 31337 }
      )
    })

    describe('resolveName', async () => {
      it('resolves names', async () => {
        const output = await provider.resolveName(TEST_NAME)
        expect(output).to.equal(TEST_EXPECTED)
      })

      it('allows getting balance of Ether', async () => {
        const balance = await provider.getBalance(TEST_NAME)
        expect(balance.toString()).to.equal('0')
      })
    })

    describe('lookupAddress', async () => {
      it('resolves the name if exists', async () => {
        const output = await provider.lookupAddress(REVERSE_TEST_PUBKEY)
        expect(output).to.equal(TEST_NAME_REVERSE)
      })
    })
  })
})
