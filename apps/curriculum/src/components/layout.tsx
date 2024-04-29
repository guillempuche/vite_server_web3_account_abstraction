import { useModal } from 'connectkit'
import type { ReactNode } from 'react'
import { useAccount } from 'wagmi'

import { Button } from '.'

export const Layout = ({ children }: { children: ReactNode }) => {
	const { isConnected, isDisconnected } = useAccount()
	const { setOpen } = useModal()

	return (
		<>
			<nav className='bg-gray-900 p-4 flex justify-end w-full'>
				{isConnected && <Button primary text='Log out' onClick={() => {}} />}
				{isDisconnected && (
					<Button primary text='Log in' onClick={() => setOpen(true)} />
				)}
			</nav>
			<main className='flex-1 w-full overflow-auto'>{children}</main>
		</>
	)
}
