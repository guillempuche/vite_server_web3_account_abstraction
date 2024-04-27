import { sepolia } from '@alchemy/aa-core'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'

import { PageHome, PageLogin } from './pages'
import { AuthProvider, useAuth, wagmiConfig } from './providers'
// import { useSession } from './providers/session'

export const App = () => {
	return (
		<AuthProvider>
			<WagmiProvider config={wagmiConfig}>
				<ConnectKitProvider mode='dark'>
					<Routes>
						{/* <Route path='/' element={<Navigate to='/home' replace />} /> */}
						<Route path='/' element={<div>hola</div>} />
						<Route path='/login' element={<PageLogin />} />
						<Route
							path='/home'
							element={
								<RequireAuth>
									<PageHome />
								</RequireAuth>
							}
						/>
					</Routes>
				</ConnectKitProvider>
			</WagmiProvider>
		</AuthProvider>
	)
}

const RequireAuth = ({ children }: { children: ReactNode }) => {
	const location = useLocation()
	const { user } = useAuth()

	if (!user) {
		console.debug('User not logged. Redirecting to the login page...')

		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return children
}
