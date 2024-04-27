import {
	alchemyGasManagerMiddleware,
	createModularAccountAlchemyClient,
} from '@alchemy/aa-alchemy'
import {
	LocalAccountSigner,
	type SmartAccountSigner,
	// SimpleSmartContractAccount,
	// SmartAccountProvider,
} from '@alchemy/aa-core'
import { sepolia } from 'viem/chains'

import type { Env } from '../utils'

export async function handleGetSigner(
	request: Request,
	env: Env,
): Promise<Response> {
	const body: any = await request.json()

	// const owner = LocalAccountSigner.privateKeyToAccountSigner(`0x${pk}`)
	// const provider = new SmartAccountProvider(
	// 	`https://eth-sepolia.g.alchemy.com/v2/${env.ALCHEMY_APP_KEY}`,
	// 	env.ALCHEMY_APP_NETWORK_URL,
	// 	chain,
	// )
	// let signer = provider.connect(
	// 	rpcClient =>
	// 		new SimpleSmartContractAccount({
	// 			entryPointAddress: env.ALCHEMY_APP_NETWORK_URL,
	// 			chain,
	// 			owner,
	// 			factoryAddress: env.SEPOLIA_SIMPLE_ACCOUNT_FACTORY_ADDRESS,
	// 			rpcClient,
	// 		}),
	// )
	// signer = alchemyGasManagerMiddleware(signer, {
	// 	policyId: env.ALCHEMY_GAS_MANAGER_POLICY_ID,
	// 	entryPoint: env.SEPOLIA_ENTRYPOINT_ADDRESS,
	// })
	// const ownerAccount = signer.account
	// const ownerAddress = (ownerAccount as any).owner.owner.address

	const signer: SmartAccountSigner = LocalAccountSigner.mnemonicToAccountSigner(
		env.ALCHEMY_MNEMONIC,
	)

	// // Client with the Gas Manager to sponsor gas.
	// // Creates a smart contract account that can be used to send user operations.
	// // The smart contract account owner + provider, as a signer, that can be used
	// // to send user operations from the SCA
	// const smartAccountClient = await createModularAccountAlchemyClient({
	// 	apiKey: env.ALCHEMY_APP_KEY,
	// 	chain: sepolia,
	// 	signer,
	// })

	return new Response(JSON.stringify({ data: signer.getAddress }), {
		headers: { 'Content-Type': 'application/json' },
	})
}
