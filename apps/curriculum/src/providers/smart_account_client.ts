import {
	accountLoupeActions,
	createMultiOwnerModularAccount,
	multiOwnerPluginActions,
	pluginManagerActions,
	sessionKeyPluginActions,
} from '@alchemy/aa-accounts'
import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy'
import {
	LocalAccountSigner,
	type SmartAccountSigner,
	createSmartAccountClient,
	sepolia,
} from '@alchemy/aa-core'

// const signer: SmartAccountSigner = LocalAccountSigner.privateKeyToAccountSigner(
// 	`0x${VITE_PRIVATE_KEY}`,
// )
const signer: SmartAccountSigner = LocalAccountSigner.mnemonicToAccountSigner(
	import.meta.env.VITE_ALCHEMY_MNEMONIC,
)

// Client with the Gas Manager to sponsor gas.
// Creates a smart contract account that can be used to send user operations.
// The smart contract account owner + provider, as a signer, that can be used
// to send user operations from the SCA
export const smartAccountClient = await createModularAccountAlchemyClient({
	apiKey: import.meta.env.VITE_ALCHEMY_APP_KEY,
	chain: sepolia,
	signer,
})

export const decoratedClient = smartAccountClient
	// // provides methods for interacting with the multi-owner plugin that is installed by default
	// .extend(multiOwnerPluginActions)
	// provides methods for managing plugins
	.extend(pluginManagerActions)
	// provides methods for querying the account's state
	.extend(accountLoupeActions)
	// provides methods for session key
	.extend(sessionKeyPluginActions)
