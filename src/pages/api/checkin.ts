import type { APIRoute } from 'astro'
import { getStore } from '@netlify/blobs'

export const prerender = false

type DayEntry = { done?: boolean; note?: string }
type MonthMap = Record<string, DayEntry>
type FitnessData = { days: Record<string, MonthMap>; plans: Record<string, string> }
type AimData = { days: Record<string, MonthMap> }
type CheckinData = { fitness: FitnessData; aim: AimData }

const defaultData: CheckinData = {
  fitness: { days: {}, plans: {} },
  aim: { days: {} }
}

const memoryStore = (() => {
  const globalScope = globalThis as { __checkinStore?: { data: CheckinData } }
  if (!globalScope.__checkinStore) {
    globalScope.__checkinStore = { data: defaultData }
  }
  return globalScope.__checkinStore
})()

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizeData(raw: unknown): CheckinData {
  const safe: CheckinData = {
    fitness: { days: {}, plans: {} },
    aim: { days: {} }
  }

  if (!isRecord(raw)) return safe

  const fitness = raw.fitness
  if (isRecord(fitness)) {
    if (isRecord(fitness.days)) {
      safe.fitness.days = fitness.days as Record<string, MonthMap>
    }
    if (isRecord(fitness.plans)) {
      safe.fitness.plans = fitness.plans as Record<string, string>
    }
  }

  const aim = raw.aim
  if (isRecord(aim) && isRecord(aim.days)) {
    safe.aim.days = aim.days as Record<string, MonthMap>
  }

  return safe
}

async function readData(): Promise<CheckinData> {
  try {
    const store = getStore('checkin')
    const stored = await store.get('data', { type: 'json' })
    return normalizeData(stored)
  } catch {
    return normalizeData(memoryStore.data)
  }
}

async function writeData(data: CheckinData): Promise<'netlify' | 'memory'> {
  try {
    const store = getStore('checkin')
    await store.set('data', data)
    return 'netlify'
  } catch {
    memoryStore.data = data
    return 'memory'
  }
}

export const GET: APIRoute = async () => {
  const data = await readData()
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  })
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const payload = isRecord(body) && 'data' in body ? body.data : body
  const normalized = normalizeData(payload)
  const source = await writeData(normalized)

  return new Response(JSON.stringify({ ok: true, source }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  })
}
