import * as secp from '@noble/secp256k1'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userbase from 'userbase-js'

import { Spinner } from '../components'
import { chainClient, simpleAccountFactoryAbi, useAuth } from '../providers'
import type { UserProps } from '../types'

export function PageSignupForm() {
	const { user, login } = useAuth()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (user?.isLoggedIn) {
			navigate('/')
		}
	}, [user?.isLoggedIn, navigate])

	/**
	 * The handleSignup function orchestrates the user signup process:
	 *
	 * 1. Generates a private key using the `@noble/secp256k1` library.
	 * 2. Uses the generated private key to request a signer object from the server:
	 *    - This request is sent to the /get-signer API endpoint.
	 *    - The endpoint utilizes the provided private key to create a `Signer` object
	 *      which is paired with a smart account owner from Alchemy's AA SDK.
	 *    - It returns the Ethereum address of the signer that will own the smart contract wallet.
	 * 3. Uses the 'viem' library along with the `simpleAccountFactoryAbi` to interact with
	 *    the `SimpleAccountFactory` smart contract:
	 *    - It reads the deterministic address of the user's smart contract wallet (`userScwAddress`).
	 */
	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Generate a private key for the user. Since this is a simple implementation
			// of account abstraction, it uses the Simple Account model which makes
			// use of a private key to generate and the smart contract wallet.
			const privateKey = secp.utils.randomPrivateKey()
			const privateKeyHex = secp.etc.bytesToHex(privateKey)

			const userData: UserProps = {
				privateKey: privateKeyHex,
			}

			const responseGetSigner = await fetch(
				`${import.meta.env.VITE_API_URL}/get-signer/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				},
			)

			const responseData = await responseGetSigner.json()
			const ownerAddress = responseData.data // access the signer object

			const userScwAddress: string = (await chainClient.readContract({
				address: '0x9406Cc6185a346906296840746125a0E44976454', // The address of this factory contract https://sepolia.etherscan.io/address/0x9406Cc6185a346906296840746125a0E44976454#code
				abi: simpleAccountFactoryAbi,
				functionName: 'getAddress',
				args: [ownerAddress, 0],
			})) as string

			const responseSignUp = await userbase.signUp({
				username,
				password,
				rememberMe: 'local',
				profile: {
					scwAddress: userScwAddress,
					pk: privateKeyHex,
				},
			})

			const userInfo = {
				username: username,
				isLoggedIn: true,
				userId: responseSignUp.userId,
				scwAddress: userScwAddress,
			}

			login(userInfo)
			navigate('/?signup=success')
		} catch (error) {
			setIsLoading(false)
			if (error instanceof Error) setError(error.message)
			else setError('An unexpected error occurred')
			console.error(error)
		}
	}

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='flex items-center justify-center h-screen bg-gray-100'>
					<div className='w-full max-w-sm'>
						<form
							className='bg-white rounded px-8 pt-6 pb-8 mb-24 font-mono'
							onSubmit={handleSignup}
						>
							<label
								className='block text-center text-gray-700 font-bold mb-2 text-xl'
								htmlFor='username'
							>
								Sign Up 👋
							</label>
							{/* <div className='divider'></div> */}
							<div className='mb-4 text-xl'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='username'
								>
									Username
								</label>
								<input
									className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									onChange={e => setUsername(e.target.value)}
									id='username'
									type='text'
									placeholder='Username'
								/>
							</div>
							<div className='mb-6 text-xl'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='password'
								>
									Password
								</label>
								<input
									className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='password'
									type='password'
									placeholder='Password'
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							{error && <p className='text-red-500 mb-4'>{error}</p>}{' '}
							<div className='flex items-center justify-end'>
								<button type='button' className='btn text-white'>
									Sign Up
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
