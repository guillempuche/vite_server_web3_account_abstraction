import { createContext } from 'react'
import {
	type Config as ContractConfig,
	useSimulateContract,
	useWriteContract,
} from 'wagmi'
import type { WriteContractData, WriteContractMutate } from 'wagmi/query'

import { abiNft } from '.'

export const nftUri = 'ipfs://QmQnnuE5XwvqivCZruqQE5NCkyjXZo6aL7oEwJDC25aRKF'

export const nftAddress = '0x1ee2cb4badb50f6f3b9ed57e0f444cb8c5e6662e'

// type INftContext = UseWriteContractReturnType<ContractConfig, unknown>
type INftContext = {
	data?: WriteContractData
	isIdle: boolean
	isSuccess: boolean
	writeContract: WriteContractMutate<ContractConfig, unknown>
}

const NftContext = createContext<INftContext | undefined>(undefined)

export const NftProvider = ({
	toAddress,
	children,
}: { toAddress: `0x${string}`; children: React.ReactNode }) => {
	const data = useSimulateContract({
		address: nftAddress, // NFT's contract address
		abi: abiNft,
		functionName: 'safeMint',
		// 1st arg is `to`, the destination address (the smart account address)
		// 2nd arg is `uri`, where the NFT is hosted "ipfs://QmQnnuE5XwvqivCZruqQE5NCkyjXZo6aL7oEwJDC25aRKF"
		args: [toAddress, nftUri],
	})
	const {
		data: mintData,
		isIdle: isIdleMint,
		isSuccess: isSuccessMint,
		writeContract: mint,
	} = useWriteContract()

	// const getNftUserOperationoCallData: any = (smartAccountClient: any) =>
	// 	encodeFunctionData(nftFunctionData)

	return (
		<NftContext.Provider
			value={{
				data: mintData,
				isIdle: isIdleMint,
				isSuccess: isSuccessMint,
				writeContract: mint,
			}}
		>
			{children}
		</NftContext.Provider>
	)
}
