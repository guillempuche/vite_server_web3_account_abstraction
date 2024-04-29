// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import userbase from 'userbase-js'

// import { Spinner } from '../components'
// // import { useAuth } from '../providers'

// export function PageLogin() {
// 	const { user, login } = useAuth()
// 	const [username, setUsername] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [error, setError] = useState<string | null>(null)
// 	const navigate = useNavigate()
// 	const [isLoading, setIsLoading] = useState(false)

// 	useEffect(() => {
// 		if (user?.isLoggedIn) {
// 			navigate('/')
// 		}
// 	}, [user?.isLoggedIn, navigate])

// 	const handleLogin = async (e: any) => {
// 		setIsLoading(true)
// 		e.preventDefault()
// 		try {
// 			const response = await userbase.signIn({
// 				username,
// 				password,
// 				rememberMe: 'local',
// 			})
// 			const userInfo = {
// 				username: username,
// 				isLoggedIn: true,
// 				userId: response.userId,
// 				userScwAddress: response.profile?.scwAddress,
// 			}
// 			login(userInfo)
// 			navigate('/?login=success')
// 			console.log(`Userbase login succesful. ✅ Welcome, ${username}!`)
// 		} catch (error: any) {
// 			setIsLoading(false)
// 			setError(error.message) // Update the error state
// 			console.error(error)
// 		}
// 	}

// 	return (
// 		<div>
// 			{isLoading ? (
// 				<Spinner />
// 			) : (
// 				<div className='flex items-center justify-center h-screen bg-gray-100'>
// 					<div className='w-full max-w-sm'>
// 						<form
// 							className='bg-white rounded px-8 pt-6 pb-8 mb-24 font-mono'
// 							onSubmit={handleLogin}
// 						>
// 							<label
// 								className='block text-center text-gray-700 font-bold mb-2 text-xl'
// 								htmlFor='username'
// 							>
// 								Login 🧙‍♂️
// 							</label>
// 							{/* <div className='divider'></div> */}
// 							<div className='mb-4 text-xl '>
// 								<label
// 									className='block text-gray-700 mb-2 font-bold'
// 									htmlFor='username'
// 								>
// 									Username
// 								</label>
// 								<input
// 									className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
// 									onChange={e => setUsername(e.target.value)}
// 									id='username'
// 									type='text'
// 									placeholder='Username'
// 									value={username}
// 								/>
// 							</div>
// 							<div className='mb-6 text-xl '>
// 								<label
// 									className='block text-gray-700 font-bold mb-2'
// 									htmlFor='password'
// 								>
// 									Password
// 								</label>
// 								<input
// 									className='bg-white sshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
// 									id='password'
// 									type='password'
// 									placeholder='Password'
// 									onChange={e => setPassword(e.target.value)}
// 									value={password}
// 								/>
// 							</div>
// 							{error && <p className='text-red-500 mb-4'>{error}</p>}{' '}
// 							<div className='flex items-center justify-between'>
// 								<a
// 									href='/sign-up'
// 									className='link link-secondary cursor-pointer'
// 									onClick={event => {
// 										event.preventDefault()
// 										navigate('/sign-up')
// 									}}
// 								>
// 									No account yet?
// 								</a>
// 								<button type='button' onClick={handleLogin} className='btn'>
// 									Login
// 								</button>
// 							</div>
// 						</form>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }
