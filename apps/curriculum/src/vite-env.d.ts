/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ALCHEMY_APP_NETWORK_URL: string
	readonly VITE_ALCHEMY_APP_KEY: string
	readonly VITE_ALCHEMY_GAS_MANAGER_POLICY_ID: string
	readonly VITE_ALCHEMY_MNEMONIC: string
	readonly VITE_PRIVATE_KEY: string
	readonly VITE_WALLET_CONNECT_PROJECT_ID: string
	readonly VITE_USERBASE_APP_ID: string
	readonly VITE_USERBASE_ACCESS_TOKEN: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
