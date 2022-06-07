import { expect } from 'chai'

import AVVY from '../src/index.js'

describe('Records', async () => {
  it('should export records', async () => {
    expect(AVVY.RECORDS.X_CHAIN).to.equal(1)
  })

  it('should list records', async () => {
    const LIST = AVVY.RECORDS._LIST
    expect(LIST[0].key).to.equal(1)
    expect(LIST[0].name).to.equal('X_CHAIN')
  })
})
