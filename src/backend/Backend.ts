// noinspection JSVoidFunctionReturnValueUsed,JSUnusedGlobalSymbols

import * as NodeHelper from 'node_helper'
import * as Log from 'logger'
import { SocketNotification } from '../constants/SocketNotifications'
import { GreetingsRequest, GreetingsResponse } from '../types/Greetings'

module.exports = NodeHelper.create({
  start(): void {
    Log.debug(`${this.name} is started!`)
  },

  stop(): void {
    Log.debug(`${this.name} is started!`)
  },

  async socketNotificationReceived(notification: string, request: GreetingsRequest) {
    if (notification === SocketNotification.GREETINGS_TEXT_REQUEST) {
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
