import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import userbase from 'userbase-js'

interface User {
	username: string
	isLoggedIn: boolean
	userId: string
	scwAddress?: string
}

interface AuthContextType {
	user: User | null
	login: (user: User) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

interface AuthProviderProps {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null)
	useEffect(() => {
		userbase
			.init({
				appId: import.meta.env.VITE_USERBASE_APP_ID,
			})
			.then((session: any) => {
				if (session.user) {
					// there is a valid active session
					console.log(
						`Userbase login succesful. ✅ Welcome, ${session.user.username}!`,
					)
					console.log(session.user)
					const userInfo = {
						username: session.user.username,
						isLoggedIn: true,
						userId: session.user.userId,
						scwAddress: session.user.profile.scwAddress,
					}
					login(userInfo)
					console.log(
						`Logged out in the authprovider, here is the user ${user?.username}`,
					)
				}
			})
			.catch(e => console.error(e))
	}, [user?.username])

	const login = (user: User) => {
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
