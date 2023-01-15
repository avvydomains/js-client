# Introduction

The Avvy Domains Javascript client provides essential functionality for interacting with `.avax` domains.

# Installation

```
npm i --save @avvy/client
```

# Usage

## Quick start

### Forward Resolution

Turn a .avax name into an EVM / C-Chain address:

```javascript
import AVVY from '@avvy/client'
import { ethers } from 'ethers'

const main = async () => {
  const PROVIDER_URL = 'https://api.avax.network/ext/bc/C/rpc'
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)
  const avvy = new AVVY(provider)
  const address = await avvy.name('avvydomains.avax').resolve(AVVY.RECORDS.EVM)
  console.log(address)
}

main()
```

### Reverse Resolution

Turn an EVM / C-Chain address into a .avax name:

```javascript
import AVVY from '@avvy/client'
import { ethers } from 'ethers'

const main = async () => {
  const PROVIDER_URL = 'https://api.avax.network/ext/bc/C/rpc'
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)
  const avvy = new AVVY(provider)
  const hash = await avvy.reverse(AVVY.RECORDS.EVM, '0x9BC4e7C1Fa4Ca66f6B2F4B6F446Dad80Ec541983')
  const name = await hash.lookup()
  console.log(name.name) // 'avvydomains.avax'
}

main()

```

Given an ERC721 token ID, retrieve the associated .avax name via reverse resolution

```javascript
import AVVY from '@avvy/client'
import { ethers } from 'ethers'

const main = async () => {
  const PROVIDER_URL = 'https://api.avax.network/ext/bc/C/rpc'
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)
  const avvy = new AVVY(provider)
  const tokenId = '6020961683474433630417776251679104264796158969684372136738248890876527059923'
  const hash = avvy.hash(tokenId)
  const name = await hash.lookup()
  console.log(name.name) // 'avvydomains.avax'
}

main()
```

## CommonJS Import

To import AVVY via require, use:

```javascript
const AVVY = require('@avvy/client/index.cjs')
```

## IMPORTANT: XSS / Code Injection Risk

The client does not perform any validation or sanitization of resolved values. Integrators should assume all values retrieved from `.resolve()` are untrusted and potentially malicious. 

## Forward Resolution & Record Types

`avvy.name('avvydomains.avax').resolve(key)` is the method to perform forward resolution. `key` can be:

- An integer, indicating a standard record. A full list of standard records is available in JSON format via `AVVY.RECORDS._LIST`, or at https://github.com/avvydomains/client-common/blob/master/records/records.json.
- A string, indicating a custom record. Users can choose arbitrary strings to store data on domains as they see fit. 

## Name hashes & input signals

Names exist as hashes on-chain. If a user registers a name with *Enhanced Privacy*, the preimage of the hash is not published to the chain. If a user registers a name with *Standard Privacy*, the preimage of the hash is published to the chain and can be used to go from hash to name.

- To convert a name into a hash, use `const hash = await avvy.utils.nameHash('name.avax')`
- To convert a hash into a name, use `const name = await avvy.hash(hash).lookup()` - **this will only work if the user registered the name with Standard Privacy**

The preimage of the hash is stored as an array of large integers which can be input directly into the [Poseidon hashing algorithm](https://www.poseidon-hash.info/). We call this form of the preimage the *input signals*. 

- To convert a name to input signals, use `inputSignals = avvy.utils.encodeNameHashInputSignals('name.avax')`
- To convert input signals t oa name, use `name = avvy.utils.decodeNameHashInputSignals(inputSignals)`

## Poseidon Hash Function

This package uses a smart contract to perform hashing calculations. For Enhanced Privacy users, this means that the preimage of the domain gets leaked to the RPC node. For applications, this means that each hash calculation is a network call. We cache the results to reduce the number of network calls.

Integrators can optionally perform the hashing locally by configuring the package as follows:

1. Install circomlibjs: `npm i circomlibjs`
2. Instantiate the Avvy client:

```javascript
import { buildPoseidon } from 'circomlibjs/src/poseidon_wasm.js'

// ...

const poseidon = await buildPoseidon()
const avvy = new AVVY(provider, {
  poseidon: async (args) => {
    return poseidon.F.toObject(poseidon(args))
  }
})
```

## Batch Operations

Batch operations rely on JSON-RPC 2.0's batch operations. You must use an RPC URL that supports JSON-RPC 2.0.

To initialize the client for batch operations:

```javascript
const avvy = new AVVY(provider, {
  batchJsonRpc: '<JSON_RPC_URL>' 
})
```

To reverse resolve a batch of EVM addresses:

```javascript
const hashes = await avvy.batch([
  '0x...',
  '0x...',
  ...
]).reverse(avvy.RECORDS.EVM)
```

To convert a batch of hashes into .avax names:

```javascript
const names = await avvy.batch(hashes).lookup()
```

If the operation fails to produce a result for an item in the batch, the result will be null.

## Accessing contracts directly

After you have initialized `const avvy = new AVVY(provider)`, all contracts are available as `ethers.Contract` instances in `avvy.contracts`.

# Running on React Native

To run the client on React Native, please see https://github.com/avvydomains/react-native-provider

# Distributing for frontend web

## Parcel

https://parceljs.org/ works nicely out of the box.

## Webpack

If you're using webpack, you'll have trouble with importing some unsupported libs. Here 

You'll probably need to install the Buffer polyfill: `npm i --save-dev buffer`

 A quick bypass is to add the following to `resolve.fallback` in your webpack config:

```
{
  buffer: require.resolve('buffer/'),
  assert: require.resolve('assert'),
}
```

You may also need to add the following to the `plugins` section in your webpack config:

```
new webpack.DefinePlugin({
  process: {
    browser: true
  }
}),
new webpack.ProvidePlugin({
  Buffer: ['buffer', 'Buffer'],
})
```

# Development

## Building

`npm run build` generates files in `./lib` from the dependencies in `./client-common`.

## Environment variables

- `AVVY_CLIENT_COMMON`. All client libraries depend on a repository called `client-common`. By default, the project is added as a git submodule, and builds use the production version of `client-common`. If you're working locally, you might want to use a local development version of `client-common`. You can provide an absolute path to the development version using this environment variable.

## Non-mainnet chains

To connect the client to non-mainnet chains:

1. Make sure that the `client-common` library has contracts for the chain ID you want to connect to
2. Initialize using `const avvy = new AVVY(provider, { chainId: 31337 })` (substitute 31337 with your chainId) 
