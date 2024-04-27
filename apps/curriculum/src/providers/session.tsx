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

export const useSession = (apiKey: string, mnemonic: string) => {
	const [sessionActive, setSessionActive] = useState(false)
	const [timeRemaining, setTimeRemaining] = useState(0)
	const [sessionKeyClient, setSessionKeyClient] = useState(null)

	const initializeSession = useCallback(async () => {
		const chain = sepolia
		const signer = LocalAccountSigner.mnemonicToAccountSigner(mnemonic)
		const sessionKeySigner = new SessionKeySigner()
		const client = (
			await createModularAccountAlchemyClient({
				chain,
				apiKey: apiKey,
				signer,
			})
		).extend(sessionKeyPluginActions)

		const isPluginInstalled = await client
			.getInstalledPlugins({})
			.then(x => x.includes(SessionKeyPlugin.meta.addresses[chain.id]))

		if (!isPluginInstalled) {
			const initialPermissions = new SessionKeyPermissionsBuilder()
				.setNativeTokenSpendLimit({
					spendLimit: 1000000n,
				})
				.setContractAccessControlType(SessionKeyAccessListType.ALLOW_ALL_ACCESS)
				.setTimeRange({
					validFrom: Math.round(Date.now() / 1000),
					validUntil: Math.round(Date.now() / 1000 + 60 * 60),
				})

			const { hash } = await client.installSessionKeyPlugin({
				args: [
					[await sessionKeySigner.getAddress()],
					['0x0'],
					[initialPermissions.encode()],
				],
			})

			await client.waitForUserOperationTransaction({ hash })
		}

		const sessionClient = (
			await createModularAccountAlchemyClient({
				chain,
				signer: sessionKeySigner,
				apiKey: apiKey,
				accountAddress: client.getAddress(),
			})
		).extend(sessionKeyPluginActions)

		// setSessionKeyClient(sessionClient)
	}, [apiKey, mnemonic])

	const checkSession = useCallback(async () => {
		if (!sessionKeyClient) return

		const isValid = true
		const validUntil = Math.round(Date.now() / 1000 + 60 * 60) // Placeholder for expiration time
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

	return { sessionActive, timeRemaining }
}
