import { Config } from './Config'

export type GreetingsState = { text: string; lastUpdated: number | null }

/** Only the MagicMirror instance methods used by this example are required. */
export interface FrontendModule extends Pick<
  Module.ModuleProperties<Config>,
  'name' | 'identifier' | 'config' | 'file' | 'updateDom' | 'sendSocketNotification'
> {
  defaults: Config
  state?: GreetingsState
  pollingTimer?: ReturnType<typeof setInterval>
  isPollingSuspended?: boolean
  start(): void
  getStyles(): string[]
  getTemplate(): string
  getTemplateData(): { text: string; lastUpdated: string }
  socketNotificationReceived(notification: string, payload: unknown): void
  suspend(): void
  resume(): void
  startPolling(): void
  stopPolling(): void
  loadData(): void
}
