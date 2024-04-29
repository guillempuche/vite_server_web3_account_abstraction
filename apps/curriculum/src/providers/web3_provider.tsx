import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'

import { wagmiConfig } from './wagmi_configuration'

const queryClient = new QueryClient()

export const Web3Provider = ({ children }: { children: ReactNode }) => {
	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider mode='dark' debugMode>
					{children}
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
