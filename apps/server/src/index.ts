/// <reference types="@cloudflare/workers-types" />

import { Router } from 'itty-router'

import { handleGetSigner } from './endpoints/get_signer'
import { handleGetUser } from './endpoints/get_user'
import { handleMint } from './endpoints/mint'
import type { Env } from './utils'

const router = Router()

// Use the logging function on all routes
router.all('*', (request, ...rest) => {
	const headers: { [key: string]: string } = {}
	request.headers.forEach((value, key) => {
		headers[key] = value
	})

	console.log({
		method: request.method,
		url: request.url,
		headers: JSON.stringify(headers),
		body: request.body ?? '',
	})
	return router.handle(request, ...rest)
})
router.post('/api/get-signer', handleGetSigner)
router.post('/api/get-user', handleGetUser)
router.post('/api/mint', handleMint)
router.all('*', () => new Response('Not found', { status: 404 }))

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		return router.handle(request) || new Response('Not Found', { status: 404 })
	},
}
