import { encodeFunctionData } from 'viem'

import { sepolia } from 'viem/chains'
import { type Env, type UserProps, createSigner } from '../utils'

export async function handleMint(
	request: Request,
	env: Env,
): Promise<Response> {
	const body: any = await request.json()
	const { userId, userScwAddress } = body

	try {
		const userResponse = await getUser(userId, env.USERBASE_ACCESS_TOKEN)
		const privateKey = userResponse.response.profile.pk
		const signer = await createSigner(env)

		const amountToSend = BigInt(0)
		const data = encodeFunctionData({
			abi: nftContractAbi,
			functionName: 'mint',
			args: [userScwAddress],
		})

		const result = await signer.sendUserOperation({
			target: SEPOLIA_NFT_ADDRESS,
			data: data,
			value: amountToSend,
		})

		const txHash = await signer.waitForUserOperationTransaction(result.hash)
		const userOpReceipt = await signer.getUserOperationReceipt(result.hash)
		const txReceipt = await signer.rpcClient.waitForTransactionReceipt({
			hash: txHash,
		})

		return new Response(JSON.stringify({ receipt: txReceipt }), {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('Error processing request:', error)
		return new Response(
			JSON.stringify({ error: 'Failed to process request' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	}
}

async function getUser(
	userId: string,
	userBaseAccessToken: string,
): Promise<UserProps> {
	const response = await fetch(
		`https://v1.userbase.com/v1/admin/users/${userId}`,
		{
			headers: {
				Authorization: `Bearer ${userBaseAccessToken}`,
			},
		},
	)
	if (!response.ok) {
		throw new Error('Failed to fetch user data')
	}
	return response.json()
}

// async function createSigner(userPrivateKey: string, env: Env) {
// 	const ENTRYPOINT_ADDRESS = '0x...' // Define this properly
// 	const SIMPLE_ACCOUNT_FACTORY_ADDRESS = '0x...' // Define this properly
// 	const owner = LocalAccountSigner.privateKeyToAccountSigner(
// 		`0x${userPrivateKey}`,
// 	)
// 	const provider = new SmartAccountProvider(
// 		ALCHEMY_API_URL,
// 		env.SEPOLIA_ENTRYPOINT_ADDRESS,
// 		sepolia,
// 	)
// 	const signer = provider.connect(
// 		rpcClient =>
// 			new SimpleSmartContractAccount({
// 				entryPointAddress: ENTRYPOINT_ADDRESS,
// 				chain: sepolia,
// 				owner,
// 				factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
// 				rpcClient,
// 			}),
// 	)
// 	// Optionally use withAlchemyGasManager if required
// 	return signer
// }
