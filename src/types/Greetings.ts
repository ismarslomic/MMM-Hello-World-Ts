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
