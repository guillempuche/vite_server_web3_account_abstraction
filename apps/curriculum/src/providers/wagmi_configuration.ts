// import { createConfig } from '@alchemy/aa-alchemy/config'
import { sepolia } from '@alchemy/aa-core'
import { getDefaultConfig } from 'connectkit'
import { http, createConfig } from 'wagmi'

// export const wagmiConfig = createConfig(
// 	getDefaultConfig({
// 		alchemyId: import.meta.env.VITE_ALCHEMY_APP_KEY,
// 		walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
// 		chains: [sepolia],
// 		appName: "Guillems's Curriculum",
// 	}),
// )
export const wagmiConfig = createConfig(
	getDefaultConfig({
		transports: {
			[sepolia.id]: http(
				`${import.meta.env.VITE_ALCHEMY_APP_NETWORK_URL}${
					import.meta.env.VITE_ALCHEMY_APP_KEY
				}`,
			),
		},
		walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
		chains: [sepolia],
		appName: "Guillems's Curriculum",
		// showQrModal: true,
		// qrModalOptions: {
		// 	themeMode: 'dark',
		// },
	}),
)
