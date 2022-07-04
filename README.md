# Usage

## Quick start - Forward Resolution

Turn a .avax name into an EVM / C-Chain address:

```
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

# Installation

```
npm i --save @avvy/client
```

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
