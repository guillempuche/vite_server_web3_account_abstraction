import {
	SessionKeyAccessListType,
	SessionKeyPermissionsBuilder,
	SessionKeyPlugin,
	SessionKeySigner,
	sessionKeyPluginActions,
} from '@alchemy/aa-accounts'
import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy'
import { LocalAccountSigner, sepolia } from '@alchemy/aa-core'
import { useCallback, useEffect, useState } from 'react'
import { useSmartAccountProvider } from './smart_account_client'

export const useSession = (apiKey: string, mnemonic: string) => {
	const { extendedSmartAccountClient } = useSmartAccountProvider()
	const [sessionActive, setSessionActive] = useState(false)
	const [timeRemaining, setTimeRemaining] = useState(0)
	const [sessionKeyClient, setSessionKeyClient] = useState(null)
	const [sessionClient, setSessionClient] = useState(null)

	const initializeSession = useCallback(async () => {
		const signer = LocalAccountSigner.mnemonicToAccountSigner(mnemonic)
		const sessionKeySigner = new SessionKeySigner()
		// const client = (
		// 	await createModularAccountAlchemyClient({
		// 		chain,
		// 		apiKey: apiKey,
		// 		signer,
		// 	})
		// ).extend(sessionKeyPluginActions)

		// Check if the plugin is installed
		const isPluginInstalled = await extendedSmartAccountClient
			.getInstalledPlugins({})
			.then(x => x.includes(SessionKeyPlugin.meta.addresses[sepolia.id]))

		// If the plugin is not installed, then install it and set up the session key
		if (!isPluginInstalled) {
			// Create an initial permission set for the session key giving it an ETH spend limit
			const initialPermissions = new SessionKeyPermissionsBuilder()
				.setNativeTokenSpendLimit({
					spendLimit: 1000000n,
				})
				.setContractAccessControlType(SessionKeyAccessListType.ALLOW_ALL_ACCESS) // Allow the session key plugin to interact with all addresses

				.setTimeRange({
					validFrom: Math.round(Date.now() / 1000),
					validUntil: Math.round(Date.now() / 1000 + 60 * 60), // Valid for 1 hour
				})

			const { hash } = await extendedSmartAccountClient.installSessionKeyPlugin(
				{
					// 1st arg is the initial set of session keys
					// 2nd arg is the tags for the session keys
					// 3rd arg is the initial set of permissions
					args: [
						[await sessionKeySigner.getAddress()],
						['0x0'],
						[initialPermissions.encode()],
					],
				},
			)

			await extendedSmartAccountClient.waitForUserOperationTransaction({
				hash,
			})
		}

		// Set up a client that's using our session key
		const session = (
			await createModularAccountAlchemyClient({
				chain: sepolia,
				signer: sessionKeySigner,
				apiKey: apiKey,
				accountAddress: extendedSmartAccountClient.getAddress(),
			})
		).extend(sessionKeyPluginActions)

		// setSessionKeyClient(sessionClient)
	}, [apiKey, mnemonic, extendedSmartAccountClient])

	const checkSession = useCallback(async () => {
		if (!sessionKeyClient) return

		const isValid = true
		const validUntil = Math.round(Date.now() / 1000 + 60 * 60) // Valid for 1 hour
		setSessionActive(isValid)
		setTimeRemaining(validUntil - Math.round(Date.now() / 1000))
	}, [sessionKeyClient])

	useEffect(() => {
		initializeSession()
		const interval = setInterval(() => {
			checkSession()
		}, 10000) // Check session every 10 seconds
		return () => clearInterval(interval)
	}, [initializeSession, checkSession])

	return { sessionClient, sessionActive, timeRemaining }
}
