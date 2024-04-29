import type { MultiOwnerModularAccount } from '@alchemy/aa-accounts'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	useAccount,
	useBalance,
	useContractWrite,
	useSimulateContract,
} from 'wagmi'

import {
	NftProvider,
	abiNft,
	nftAddress,
	useSmartAccountProvider,
} from '../providers'

export function PageHome() {
	const navigate = useNavigate()
	// const [account, setAccount] = useState<MultiOwnerModularAccount | null>(null)
	const { extendedSmartAccountClient } = useSmartAccountProvider()
	const { data: nftBalance } = useBalance({
		address: nftAddress,
	})
	const account = useAccount()
	const result = useSimulateContract({
		address: nftAddress, // NFT's contract Address
		abi: abiNft,
		functionName: 'safeMint',
		args: ['XXX'], // Your Address
	})

	/**
	 * Get access to the curriculum allowing the smart account to have access to the NFT.
	 *
	 * Docs https://accountkit.alchemy.com/using-smart-accounts/send-user-operations.html
	 */
	async function getAccessToCurriculum() {
		// const userOperation = await extendedSmartAccountClient.sendUserOperation({
		// 	uo: {
		// 		target: nftAddress,
		// 		data: getNftUserOperationoCallData(extendedSmartAccountClient),
		// 		value: 0n, // The Alchemy's Gas Manager sponsors the gas
		// 	},
		// })
		// const txHash =
		// 	await extendedSmartAccountClient.waitForUserOperationTransaction(
		// 		userOperation,
		// 	)
		// console.log(
		// 	`Transaction hash: ${txHash} for user operation: ${userOperation}`,
		// )
	}

	const isAccountHaveAccessToCurriculum = () => (nftBalance?.decimals ?? 0) > 0

	async function mintNft() {
		useContractWrite
	}

	return (
		<div>
			<div>Home</div>
			<div>
				Access to {nftAddress} is {isAccountHaveAccessToCurriculum().toString()}
			</div>
			<div>
				NFT "
				<a
					href='https://testnets.opensea.io/assets/sepolia/0x1ee2cb4badb50f6f3b9ed57e0f444cb8c5e6662e/0'
					target='_blank'
					rel='noreferrer'
				>
					Guillem Curriculum
				</a>
				" {nftAddress} balance is {nftBalance?.decimals}
			</div>
			{account.address !== undefined ? (
				<NftProvider toAddress={account.address}>
					<div>Logic to mint the NFT</div>
				</NftProvider>
			) : null}
			<div>
				Curriculum content (unlocked or locked according to the NFT ownership)
			</div>
		</div>
	)
}
