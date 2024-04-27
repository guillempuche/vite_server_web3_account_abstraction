import { http, createPublicClient } from 'viem'
import { sepolia } from 'viem/chains'

export const chainClient = createPublicClient({
	chain: sepolia,
	transport: http(),
})
