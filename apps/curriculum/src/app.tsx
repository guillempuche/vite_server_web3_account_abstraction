import { ConnectKitProvider } from 'connectkit'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { useAccount } from 'wagmi'
import { Layout } from './components'
import { PageHome, PageLogin } from './pages'
// import { useSession } from './providers/session'

export const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/home' replace />} />
			<Route path='/login' element={<PageLogin />} />
			<Route
				path='/home'
				element={
					<RequireAuth>
						<Layout>
							<PageHome />
						</Layout>
					</RequireAuth>
				}
			/>
			<Route path='*' element={<h1>Page not found</h1>} />
		</Routes>
	)
}

const RequireAuth = ({ children }: { children: ReactNode }) => {
	const location = useLocation()
	const { isDisconnected } = useAccount()

	if (isDisconnected) {
		console.debug("Account isn't connected. Redirecting to the login page...")

		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return children
}
