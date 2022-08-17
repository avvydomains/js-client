import { expect } from 'chai'
import { ethers } from 'ethers'

import AVVY from '../src/index.js'

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
const TEST_NAME = 'avvy-client-common-testing.avax'

describe('Names', async () => {
  let avvy

  beforeEach(async () => {
    avvy = new AVVY(provider, {
      chainId: 31337
    })
  })

  it('should resolve a standard record', async () => {
    const address = await avvy.name(TEST_NAME).resolve(AVVY.RECORDS.X_CHAIN)

    // this is the sender of the first X-Chain transaction, after genesis
    // see https://avascan.info/blockchain/x/tx/23y4DfgdAPj3teuJzrEfSXZkvmDpwYSbrmVHB82oLJGcMbXU8U
    const expected = 'x-avax13fd740ykwc5peewmkcgu8r9nmnhns5gpdrgfjy'
    expect(address).to.equal(expected)
  })

  it('should resolve regardless of casing', async () => {
    const address = await avvy.name(TEST_NAME.toUpperCase()).resolve(AVVY.RECORDS.X_CHAIN)

    // this is the sender of the first X-Chain transaction, after genesis
    // see https://avascan.info/blockchain/x/tx/23y4DfgdAPj3teuJzrEfSXZkvmDpwYSbrmVHB82oLJGcMbXU8U
    const expected = 'x-avax13fd740ykwc5peewmkcgu8r9nmnhns5gpdrgfjy'
    expect(address).to.equal(expected)
  })

  it('should resolve a custom record', async () => {
    const address = await avvy.name(TEST_NAME).resolve('CUSTOM_KEY')
    const expected = 'CUSTOM_VALUE'
    expect(address).to.equal(expected)
  })

  it('should fail to resolve a record on an expired domain', async () => {
    const name = 'avvy-client-common-expired.avax'
    
    try {
      await avvy.name(name).resolve(AVVY.RECORDS.X_CHAIN)
      throw "This should not resolve.."
    } catch (err) {
      expect(err).to.equal('Domain registration is expired')
    }
  })

  it('should fail gracefully when a record does not have a resolver set', async () => {
    const name = 'avvy-client-common-no-resolver.avax'
    
    try {
      await avvy.name(name).resolve(AVVY.RECORDS.X_CHAIN)
      throw "This should not resolve.."
    } catch (err) {
      expect(err).to.equal('No resolver set')
    }
  })
})
