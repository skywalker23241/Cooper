export const prerender = false

import type { APIRoute } from 'astro'
import { privatePayload } from '@/data/private-content'

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
} as const

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders
  })
}

const password = import.meta.env.PRIVATE_PAGE_PASSWORD || ''

export const POST: APIRoute = async ({ request }) => {
  if (!password) {
    return jsonResponse({ error: 'Private page password is not configured.' }, 503)
  }

  let payload: unknown = null
  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload.' }, 400)
  }

  const providedPassword =
    typeof payload === 'object' && payload !== null && 'password' in payload
      ? (payload as { password?: string }).password
      : undefined

  if (!providedPassword) {
    return jsonResponse({ error: 'Password is required.' }, 400)
  }

  if (providedPassword !== password) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return jsonResponse({ error: 'Access denied.' }, 401)
  }

  return jsonResponse({
    issuedAt: new Date().toISOString(),
    payload: privatePayload
  })
}
