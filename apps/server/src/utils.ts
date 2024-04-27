import { LocalAccountSigner, type SmartAccountSigner } from '@alchemy/aa-core'
import type { HDAccount } from 'viem/accounts'

export interface Env {
	ALCHEMY_APP_NETWORK_HOST_URL: string
	ALCHEMY_APP_NETWORK_URL: string
	ALCHEMY_APP_KEY: string
	ALCHEMY_GAS_MANAGER_POLICY_ID: string
	ALCHEMY_MNEMONIC: string
	PRIVATE_KEY: string
	WALLET_CONNECT_PROJECT_ID: string
	USERBASE_APP_ID: string
	USERBASE_ACCESS_TOKEN: string
}

export interface UserProps {
	privateKey: string
}

export function createSigner(env: Env): LocalAccountSigner<HDAccount> {
	return LocalAccountSigner.mnemonicToAccountSigner(env.ALCHEMY_MNEMONIC)
}
