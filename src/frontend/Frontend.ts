import { GreetingsRequest, isGreetingsResponse } from '../types/Greetings'
import { FrontendModule } from '../types/FrontendModule'
import * as Log from 'logger'
import { SocketNotification } from '../constants/SocketNotifications'

// JavaScript timers use a signed 32-bit delay; larger values overflow.
const maximumTimerDelay = 2 ** 31 - 1

const frontendModule: Omit<
  FrontendModule,
  'name' | 'identifier' | 'config' | 'file' | 'updateDom' | 'sendSocketNotification'
> &
  ThisType<FrontendModule> = {
  defaults: {
    text: 'Hello World!',
    updateInterval: 10000,
    pauseWhenHidden: false,
  },

  start(): void {
    Log.debug(`${this.name} is starting`)
    this.state = { text: this.config.text, lastUpdated: null }
    this.loadData()
    this.startPolling()
    this.updateDom()
  },

  getStyles() {
    return [this.file('css/MMM-Hello-World-Ts.css')]
  },

  getTemplate(): string {
    return 'templates/MMM-Hello-World-Ts.njk'
  },

  getTemplateData(): { text: string; lastUpdated: string } {
    const lastUpdated = this.state?.lastUpdated
    return {
      text: this.state?.text ?? this.config.text,
      lastUpdated: lastUpdated == null ? '' : new Date(lastUpdated).toLocaleString(),
    }
  },

  socketNotificationReceived(notificationIdentifier: string, payload: unknown): void {
    if (notificationIdentifier === SocketNotification.GREETINGS_TEXT_RESPONSE) {
      if (!isGreetingsResponse(payload)) {
        Log.error(`${this.name} received an invalid greeting response`)
        return
      }
      // The helper broadcasts to every instance of this module type.
      if (payload.identifier !== this.identifier) {
        return
      }
      Log.debug(
        `${this.name} received a socket notification: '${notificationIdentifier}' with payload: ${JSON.stringify(
          payload
        )}`
      )
      this.state = payload
      this.updateDom()
    } else {
      Log.error(`${this.name} received unknown socket notification: '${notificationIdentifier}'`)
    }
  },

  suspend(): void {
    if (this.config.pauseWhenHidden) {
      this.isPollingSuspended = true
      this.stopPolling()
    }
  },

  resume(): void {
    // Repeated show calls must not create extra timers or requests.
    if (this.config.pauseWhenHidden && this.isPollingSuspended) {
      this.isPollingSuspended = false
      this.loadData()
      this.startPolling()
    }
  },

  startPolling(): void {
    this.stopPolling()
    if (this.isPollingSuspended) {
      return
    }

    const configuredInterval = this.config.updateInterval
    const isValidInterval =
      Number.isInteger(configuredInterval) && configuredInterval > 0 && configuredInterval <= maximumTimerDelay
    const updateInterval = isValidInterval ? configuredInterval : this.defaults.updateInterval
    if (!isValidInterval) {
      Log.error(`${this.name} has an invalid updateInterval; using ${updateInterval} ms`)
    }
    this.pollingTimer = setInterval(() => {
      this.loadData()
    }, updateInterval)
  },

  stopPolling(): void {
    if (this.pollingTimer !== undefined) {
      clearInterval(this.pollingTimer)
      this.pollingTimer = undefined
    }
  },

  loadData(): void {
    Log.debug(`${this.name} is loading data`)
    const request: GreetingsRequest = { identifier: this.identifier, config: this.config }
    this.sendSocketNotification(SocketNotification.GREETINGS_TEXT_REQUEST, request)
  },
}

Module.register('MMM-Hello-World-Ts', frontendModule)
