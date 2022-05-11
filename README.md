# Usage

```
import AVVY from '@avvy/js-client'
import { ethers } from 'ethers'

const main = async () => {
  const PROVIDER_URL = 'https://your-provider-url.com'
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)
  const avvy = new AVVY(provider)
  const address = await avvy.name('avvydomains.avax').resolve(AVVY.RECORDS.EVM)
  console.log(address)
}

main()
```

# Development

## Building

`npm run build` generates files in `./lib` from the dependencies in `./client-common`.

## Environment variables

- `AVVY_CLIENT_COMMON`. All client libraries depend on a repository called `client-common`. By default, the project is added as a git submodule, and builds use the production version of `client-common`. If you're working locally, you might want to use a local development version of `client-common`. You can provide an absolute path to the development version using this environment variable.
