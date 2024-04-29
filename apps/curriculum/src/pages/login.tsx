import { useModal } from 'connectkit'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { Button } from '../components'

export const PageLogin = () => {
	const { open, setOpen } = useModal()
	const navigate = useNavigate()
	const { isConnected } = useAccount()

	useEffect(() => {
		// Redirect to home if the Web3Auth modal is closed
		if (!open) {
			navigate('/')
		}
	}, [open, navigate])

	// Open Web3Auth modal if user is connected
	if (isConnected) {
		setOpen(true)
		return null
	}

	return (
		<>
			<div>Unblock content with login</div>
			<Button text='Login' onClick={() => setOpen(true)} />
		</>
	)
}
