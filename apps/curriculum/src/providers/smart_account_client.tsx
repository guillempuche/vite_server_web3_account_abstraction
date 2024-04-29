import {
	accountLoupeActions,
	createMultiOwnerModularAccount,
	multiOwnerPluginActions,
	pluginManagerActions,
	sessionKeyPluginActions,
} from '@alchemy/aa-accounts'
import {
	alchemyEnhancedApiActions,
	createModularAccountAlchemyClient,
} from '@alchemy/aa-alchemy'
import {
	LocalAccountSigner,
	type SmartAccountClient,
	type SmartAccountSigner,
	sepolia,
} from '@alchemy/aa-core'
import { Alchemy, Network } from 'alchemy-sdk'
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { http, createPublicClient } from 'viem'

export const chainPublicClient = createPublicClient({
	chain: sepolia,
	transport: http(),
})

// const alchemySigner: SmartAccountSigner = LocalAccountSigner.privateKeyToAccountSigner(
// 	`0x${VITE_PRIVATE_KEY}`,
// )
export const alchemySigner: SmartAccountSigner =
	LocalAccountSigner.mnemonicToAccountSigner(import.meta.env.VITE_MNEMONIC)

const alchemyClient = new Alchemy({
	network: Network.ETH_SEPOLIA,
	apiKey: process.env.REACT_APP_ALCHEMY_APP_KEY,
})

interface ISmartAccountContext {
	alchemyClient: Alchemy
	extendedSmartAccountClient?: SmartAccountClient
	smartAccountClient?: SmartAccountClient
	setSigner: (newSigner: SmartAccountSigner) => void
}

const SmartAccountContext = createContext<ISmartAccountContext>({
	alchemyClient,
	extendedSmartAccountClient: undefined,
	smartAccountClient: undefined,
})

export const useSmartAccountProvider = () => {
	const context = useContext(SmartAccountContext)
	if (context === null) {
		throw new Error(
			'useSmartAccountProvider must be used within a SmartAccountProvider',
		)
	}
	return context
}

export const SmartAccountProvider = ({
	signer,
	children,
}: { signer: any; children: ReactNode }) => {
	const [smartAccountClient, setSmartAccountClient] = useState<
		SmartAccountClient | undefined
	>(undefined)
	const [extendedSmartAccountClient, setExtendedSmartAccountClient] = useState<
		SmartAccountClient | undefined
	>(undefined)

	useEffect(() => {
		async function init() {
			if (signer !== undefined) {
				// Client with the Gas Manager to sponsor gas.
				// It creates a smart contract account that can be used to send user operations.
				// The smart contract account owner + provider, as a signer, that can be used
				// to send user operations from the SCA
				const client = await createModularAccountAlchemyClient({
					apiKey: import.meta.env.VITE_ALCHEMY_APP_KEY,
					chain: sepolia,
					signer: alchemySigner,
					opts: {
						txMaxRetries: 5,
						txRetryIntervalMs: 2_000,
						txRetryMultiplier: 1.5,
					},

					useSimulation: true, // Simulate user operations before sending them to ensure they don't revert
					gasManagerConfig: {
						policyId: import.meta.env.VITE_ALCHEMY_GAS_MANAGER_POLICY_ID,
					},
				})
				setSmartAccountClient(client)

				// Extend the smart account client with additional methods
				const extendedSmartAccountClient = client
					.extend(accountLoupeActions) // Provides methods for querying the account's state
					// .extend(pluginManagerActions) // Provides methods for managing plugins
					// .extend(sessionKeyPluginActions) // Provides methods for session key
					.extend(alchemyEnhancedApiActions(alchemyClient))

				setExtendedSmartAccountClient(extendedSmartAccountClient)
			}
		}
		init()
	}, [signer])

	return (
		<SmartAccountContext.Provider
			value={{
				alchemyClient: alchemyClient,
				extendedSmartAccountClient,
				smartAccountClient,
			}}
		>
			{children}
		</SmartAccountContext.Provider>
	)
}
