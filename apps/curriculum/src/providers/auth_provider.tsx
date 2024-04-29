import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import userbase, { type Session } from 'userbase-js'

import type { UserDatabase } from '../types'

interface IAuthContext {
	user: UserDatabase | null
	login: (user: UserDatabase) => void
	logout: () => void
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

function useAuth(): IAuthContext {
	const context = useContext(AuthContext)

	if (!context) throw new Error('useAuth must be used within an AuthProvider')

	return context
}

function AuthProvider({
	children,
}: {
	children: ReactNode
}) {
	const [user, setUser] = useState<UserDatabase | null>(null)

	useEffect(() => {
		console.log(import.meta.env.VITE_USERBASE_APP_ID)
		userbase
			.init({
				appId: import.meta.env.VITE_USERBASE_APP_ID,
			})
			.then((session: Session) => {
				if (session.user) {
					console.log('UserbaseJS login succesful', session.user)
					const userInfo = {
						isLoggedIn: true,
						username: session.user.username,
						userId: session.user.userId,
						scwAddress: session.user.profile?.scwAddress,
					}
					login(userInfo)
				}
			})
			.catch(e => console.error(e))
	}, [])

	const login = (user: UserDatabase) => {
		setUser(user)
	}

	const logout = () => {
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
