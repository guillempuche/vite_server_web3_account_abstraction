// import type { SendUserOperationResult } from '@alchemy/aa-core'
// import { parseEther } from 'viem'
// import { smartAccountClient } from './smart_account_client'

// const ADDR = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' // replace with the adress you want to send SepoliaETH to, unless you want to send ETH to Vitalik :)

// /**
//  * @description Creates a smart contract account, and sends ETH to the specified address (could be an EOA or SCA)
//  * @note Seperating the logic to create the account, and the logic to send the transaction
//  */
// export async function main() {
// 	const amountToSend: bigint = parseEther('0.0001')

// 	const result: SendUserOperationResult =
// 		await smartAccountClient.sendUserOperation({
// 			uo: {
// 				target: ADDR,
// 				data: '0x',
// 				value: amountToSend,
// 			},
// 		})

// 	console.log('User operation result: ', result)

// 	console.log(
// 		'\nWaiting for the user operation to be included in a mined transaction...',
// 	)

// 	const txHash =
// 		await smartAccountClient.waitForUserOperationTransaction(result)

// 	console.log('\nTransaction hash: ', txHash)

// 	const userOpReceipt = await smartAccountClient.getUserOperationReceipt(
// 		result.hash as `0x${string}`,
// 	)

// 	console.log('\nUser operation receipt: ', userOpReceipt)

// 	const txReceipt = await smartAccountClient.waitForTransactionReceipt({
// 		hash: txHash,
// 	})

// 	return txReceipt
// }

// main()
// 	.then(txReceipt => {
// 		console.log('\nTransaction receipt: ', txReceipt)
// 	})
// 	.catch(err => {
// 		console.error('Error: ', err)
// 	})
// 	.finally(() => {
// 		console.log('\n--- DONE ---')
// 	})
