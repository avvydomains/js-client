import { expect } from 'chai'

import AVVY from '../src/index.js'

describe('Records', async () => {
  it('should export records', async () => {
    expect(AVVY.RECORDS.X_CHAIN).to.equal(1)
  })
})
