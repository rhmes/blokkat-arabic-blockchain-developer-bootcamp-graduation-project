
// config/index.tsx

import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, sepolia, scrollSepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = '601ccf3e6f4f2c57d6b968d64e356030'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, sepolia, arbitrum, scrollSepolia]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig