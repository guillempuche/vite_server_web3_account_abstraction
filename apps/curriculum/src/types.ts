export interface UserDatabase {
	username: string
	isLoggedIn: boolean
	userId: string
	scwAddress?: string
}

export interface UserAccount {
	privateKey: string
}
