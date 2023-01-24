import { expect } from 'chai'
import { ethers } from 'ethers'

import AVVY from '../src/index.js'

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
const TEST_NAME = 'avvy-client-common-reverse.avax'
const REVERSE_TEST_PUBKEY = '0x650197C550B00fdD74C0F533cAf877dD39F79270'
const REVERSE_TEST_PUBKEY_NOT_SET = '0x18f4Cc86D27655A6C907B79ed65a82085D5D1A43'

describe('Batch Operations', async () => {
  let avvy

  describe('JsonBatchExecutor', async () => {
    beforeEach(async () => {
      avvy = new AVVY(provider, {
        chainId: 31337,
        batchJsonRpc: 'http://localhost:8545',
        fetchJson: ethers.utils.fetchJson
      })
    })

    it('should batch reverse evm addresses', async () => {
      const hashes = (await avvy.batch([
        REVERSE_TEST_PUBKEY,
      ]).reverse(avvy.RECORDS.EVM))
      const hash = await avvy.utils.nameHash(TEST_NAME)
      expect(hashes[0].toString()).to.equal(hash.toString())
    })

    it('should batch lookup hashes', async () => {
      const name = await avvy.utils.nameHash(TEST_NAME)
      const names = (await avvy.batch([
        name
      ]).lookup())
      expect(names[0]).to.equal(TEST_NAME)
    })

    it('should work for reversing evm addresses & looking up hashes', async () => {
      const hashes = await avvy.batch([
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
      ]).reverse(avvy.RECORDS.EVM)
      const names = await avvy.batch(hashes).lookup()
      expect(names[0]).to.be.null
      expect(names[1]).to.equal(TEST_NAME)
      expect(names[2]).to.be.null
      expect(names[3]).to.equal(TEST_NAME)
      expect(names[4]).to.be.null
      expect(names[5]).to.equal(TEST_NAME)
      expect(names[6]).to.be.null
      expect(names[7]).to.equal(TEST_NAME)
    })

    it('should work for reversing EVM addresses to names', async () => {
      const names = await avvy.batch([
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
      ]).reverseToNames(avvy.RECORDS.EVM)
      expect(names[0]).to.be.null
      expect(names[1]).to.equal(TEST_NAME)
      expect(names[2]).to.be.null
      expect(names[3]).to.equal(TEST_NAME)
      expect(names[4]).to.be.null
      expect(names[5]).to.equal(TEST_NAME)
      expect(names[6]).to.be.null
      expect(names[7]).to.equal(TEST_NAME)
    })
  })

  describe('MulticallBatchExecutor', async () => {
    beforeEach(async () => {
      avvy = new AVVY(provider, {
        chainId: 31337,
      })
    })

    it('should batch reverse evm addresses', async () => {
      const hashes = (await avvy.batch([
        REVERSE_TEST_PUBKEY,
      ]).reverse(avvy.RECORDS.EVM))
      const hash = await avvy.utils.nameHash(TEST_NAME)
      expect(hashes[0].toString()).to.equal(hash.toString())
    })

    it('should batch lookup hashes', async () => {
      const name = await avvy.utils.nameHash(TEST_NAME)
      const names = (await avvy.batch([
        name
      ]).lookup())
      expect(names[0]).to.equal(TEST_NAME)
    })

    it('should work for reversing evm addresses & looking up hashes', async () => {
      const hashes = await avvy.batch([
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
      ]).reverse(avvy.RECORDS.EVM)
      const names = await avvy.batch(hashes).lookup()
      expect(names[0]).to.be.null
      expect(names[1]).to.equal(TEST_NAME)
      expect(names[2]).to.be.null
      expect(names[3]).to.equal(TEST_NAME)
      expect(names[4]).to.be.null
      expect(names[5]).to.equal(TEST_NAME)
      expect(names[6]).to.be.null
      expect(names[7]).to.equal(TEST_NAME)
    })

    it('should work for reversing EVM addresses to names', async () => {
      const names = await avvy.batch([
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
        REVERSE_TEST_PUBKEY_NOT_SET,
        REVERSE_TEST_PUBKEY,
      ]).reverseToNames(avvy.RECORDS.EVM)
      expect(names[0]).to.be.null
      expect(names[1]).to.equal(TEST_NAME)
      expect(names[2]).to.be.null
      expect(names[3]).to.equal(TEST_NAME)
      expect(names[4]).to.be.null
      expect(names[5]).to.equal(TEST_NAME)
      expect(names[6]).to.be.null
      expect(names[7]).to.equal(TEST_NAME)
    })
  })
})
