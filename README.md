# Installation

```
npm i --save @avvy/client
```

# Usage

## Quick start

**Forward Resolution**

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

## Accessing contracts directly

After you have initialized `const avvy = new AVVY(provider)`, all contracts are available as `ethers.Contract` instances in `avvy.contracts`.

# Distributing for frontend web

## Parcel

https://parceljs.org/ works nicely out of the box.

## Webpack

If you're using webpack, you'll have trouble with importing some unsupported libs. A quick bypass is to add the following to `resolve.fallback` in your webpack config:

```
{
  os: false,
  crypto: false,
}
```

You may also need to run `npm i --save-dev process assert`, and add the following to `plugins` in your webpack config:

```
new webpack.ProvidePlugin({
  process: 'process/browser',
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
