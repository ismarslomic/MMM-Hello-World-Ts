import { Config } from './Config'

export type GreetingsRequest = {
  identifier: string
  config: Config
}

export type GreetingsResponse = {
  identifier: string
  text: string
  lastUpdated: number
}

/** Socket payloads cross a runtime boundary; TypeScript alone cannot validate them. */
export function isGreetingsRequest(payload: unknown): payload is GreetingsRequest {
  if (typeof payload !== 'object' || payload === null) return false
  if (!('identifier' in payload) || typeof payload.identifier !== 'string') return false
  if (!('config' in payload) || typeof payload.config !== 'object' || payload.config === null) return false
  return 'text' in payload.config && typeof payload.config.text === 'string'
}

export function isGreetingsResponse(payload: unknown): payload is GreetingsResponse {
  if (typeof payload !== 'object' || payload === null) return false
  return (
    'identifier' in payload &&
    typeof payload.identifier === 'string' &&
    'text' in payload &&
    typeof payload.text === 'string' &&
    'lastUpdated' in payload &&
    typeof payload.lastUpdated === 'number' &&
    Number.isFinite(payload.lastUpdated) &&
    !Number.isNaN(new Date(payload.lastUpdated).getTime())
  )
}
