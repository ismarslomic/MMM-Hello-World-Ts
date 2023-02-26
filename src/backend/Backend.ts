// noinspection JSVoidFunctionReturnValueUsed,JSUnusedGlobalSymbols

import * as NodeHelper from 'node_helper'
import * as Log from 'logger'
import {SocketNotification} from '../constants/SockerNotifications';
import {Config} from '../types/Config'

export default NodeHelper.create({
  start(): void {
    Log.info(`${this.name} is started!`)
  },

  stop(): void {
    Log.info(`${this.name} is started!`)
  },

  async socketNotificationReceived(notification: SocketNotification, config: Config) {
    if (notification === SocketNotification.GREETINGS_TEXT_REQUEST) {
      Log.info(`${this.name} received a socket notification: '${notification}' with config: ${JSON.stringify(config)}`)
      const payload = {
        text: `${this.name} says: ${config.text}`,
        lastUpdated: Date.now(),
      }
      this.sendSocketNotification(SocketNotification.GREETINGS_TEXT_RESPONSE, payload)
    } else {
      Log.error(`${this.name} received unknown socket notification: '${notification}'`)
    }
  }
})
