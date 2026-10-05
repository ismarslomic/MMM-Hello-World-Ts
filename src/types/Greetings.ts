import { Config } from './Config'

/** Socket payload sent from the frontend to the node helper to request a greeting. */
export type GreetingsRequest = {
  /** Identifier of the requesting module instance, echoed back in the response so the instance can recognise it. */
  identifier: string
  /** Configuration of the requesting module instance. */
  config: Config
}

/** Socket payload sent from the node helper back to the frontend with the greeting. */
export type GreetingsResponse = {
  /** Identifier of the module instance that made the request. */
  identifier: string
  /** The greeting text to show. */
  text: string
  /** When the greeting was produced, as a Unix timestamp in milliseconds. */
  lastUpdated: number
}

/**
 * Type guard for {@link GreetingsRequest}. Socket payloads cross a runtime boundary; TypeScript alone
 * cannot validate them. Only `identifier` and `config.text` are checked, as these are the fields the node helper uses.
 */
export function isGreetingsRequest(payload: unknown): payload is GreetingsRequest {
  if (typeof payload !== 'object' || payload === null) return false
  if (!('identifier' in payload) || typeof payload.identifier !== 'string') return false
  if (!('config' in payload) || typeof payload.config !== 'object' || payload.config === null) return false
  return 'text' in payload.config && typeof payload.config.text === 'string'
}

/**
 * Type guard for {@link GreetingsResponse}. Requires string `identifier` and `text`, and a finite
 * `lastUpdated` that is a valid date timestamp.
 */
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
