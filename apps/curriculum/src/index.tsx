import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'
import './index.css'
import { Web3Provider } from './providers'

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<Web3Provider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Web3Provider>
	</StrictMode>,
)
