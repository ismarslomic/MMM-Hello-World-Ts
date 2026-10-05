// noinspection JSVoidFunctionReturnValueUsed,JSUnusedGlobalSymbols

// Default import preserves static methods on MagicMirror's CommonJS NodeHelper class.
import NodeHelper from 'node_helper'
import * as Log from 'logger'
import { SocketNotification } from '../constants/SocketNotifications'
import { GreetingsResponse, isGreetingsRequest } from '../types/Greetings'

export default NodeHelper.create({
  start(): void {
    Log.debug(`${this.name} is started!`)
  },

  stop(): void {
    Log.debug(`${this.name} is started!`)
  },

  socketNotificationReceived(notification: string, request: unknown): void {
    if (notification === SocketNotification.GREETINGS_TEXT_REQUEST) {
      if (!isGreetingsRequest(request)) {
        Log.error(`${this.name} received an invalid greeting request`)
        return
      }
      Log.debug(
        `${this.name} received a socket notification: '${notification}' with config: ${JSON.stringify(request)}`
      )
      const payload: GreetingsResponse = {
        identifier: request.identifier,
        text: `${this.name} says: ${request.config.text}`,
        lastUpdated: Date.now(),
      }
      this.sendSocketNotification(SocketNotification.GREETINGS_TEXT_RESPONSE, payload)
    } else {
      Log.error(`${this.name} received unknown socket notification: '${notification}'`)
    }
  },
})
