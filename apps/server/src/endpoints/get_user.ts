import type { Env } from '../utils'

export async function handleGetUser(
	request: Request,
	env: Env,
): Promise<Response> {
	const body: any = await request.json()
	const { userId } = body

	try {
		const response = await fetch(
			`https://v1.userbase.com/v1/admin/users/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${env.USERBASE_ACCESS_TOKEN}`,
				},
			},
		)
		const data = await response.json()

		console.log(data) // The user data will be available here

		return new Response(JSON.stringify({ response: data }), {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error fetching user' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
