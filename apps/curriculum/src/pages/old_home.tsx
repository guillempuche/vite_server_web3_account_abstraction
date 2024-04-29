import { AvatarGenerator } from 'random-avatar-generator'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userbase from 'userbase-js'

// import { GaslessMinter, WalletDisplay } from '../components'
// import { useAuth } from '../providers'

export function PageHome() {
	// const { user, logout } = useAuth()
	const navigate = useNavigate()
	const [walletViewActive, setWalletViewActive] = useState(true)
	const generator = new AvatarGenerator()

	function handleLogout() {
		try {
			userbase
				.signOut()
				.then(() => {
					console.log('User logged out!')
					logout()
					navigate('/')
				})
				.catch(err => console.error(err))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			{user?.isLoggedIn ? (
				<div className='font-mono text-2xl mt-8'>
					<div className='flex items-center justify-center'>
						<div className='avatar'>
							<div className='rounded-full ml-12'>
								<img
									src={generator.generateRandomAvatar(user?.userId)}
									alt='User Avatar'
								/>
							</div>
						</div>
						<div className='flex flex-col ml-6 gap-2'>
							<div className='text-black'>
								<b>User:</b> {user?.username}
							</div>
							<div className='text-black'>
								<b>SCW :</b>{' '}
								<a
									className='link link-secondary'
									href={`https://sepolia.etherscan.io/address/${user?.scwAddress}`}
									target='_blank'
									rel='noreferrer'
								>
									{user?.scwAddress}
								</a>
							</div>
							<div className='text-black'>
								{user?.isLoggedIn ? (
									<button
										type='button'
										className='btn btn-outline'
										onClick={handleLogout}
									>
										Log out
									</button>
								) : (
									''
								)}
							</div>
						</div>
					</div>
					<div className='tabs items-center flex justify-center mb-[-25px]'>
						<button
							type='button'
							className={`tab tab-lg tab-lifted text-2xl ${
								walletViewActive ? 'tab-active text-white' : ''
							}`}
							onClick={() => setWalletViewActive(true)}
							aria-pressed={walletViewActive}
						>
							Your Wallet
						</button>
						<button
							type='button'
							className={`tab tab-lg tab-lifted text-2xl ${
								walletViewActive ? '' : 'tab-active text-white'
							}`}
							onClick={() => setWalletViewActive(false)}
							aria-pressed={!walletViewActive}
						>
							Mint an NFT
						</button>
					</div>
					{/* <div className='divider mx-16 mb-8'></div> */}
					{/* {walletViewActive ? <WalletDisplay /> : <GaslessMinter />} */}
				</div>
			) : (
				<div>
					<div className='text-black flex flex-col items-center justify-center mt-36 mx-8 text-4xl font-mono'>
						Please log in to continue! 👀
						<button
							type='button'
							onClick={() => navigate('/login')}
							className='btn mt-6 text-white'
						>
							Login
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
