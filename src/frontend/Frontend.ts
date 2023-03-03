import { Config } from '../types/Config'
import * as Log from 'logger'
import { SocketNotification } from '../constants/SocketNotifications'

Module.register<Config>('MMM-Hello-World-Ts', {
  // Default module config
  defaults: {
    text: 'Hello World!',
  },

  // MM function: this method is called when all modules are loaded and the system is ready to boot up.
  start(): void {
    Log.debug(`${this.name} is starting`)
    this.loadData()
    this.scheduleUpdate()
    this.updateDom()
  },

  /**
   * The getStyles method is called to request any additional stylesheets that need to be loaded.
   * This method should therefore return an array with strings. If you want to return a full path
   * to a file in the module folder, use the this.file('filename.css') method. In all cases the
   * loader will only load a file once. It even checks if the file is available in the default
   * vendor folder.
   */
  getStyles() {
    return [this.file('css/MMM-Hello-World-Ts.css')]
  },

  // MM function: loads template
  getTemplate(): string {
    return 'templates/MMM-Hello-World-Ts.njk'
  },

  // MM function: returns template data
  getTemplateData(): { text: string; lastUpdated: string } {
    return {
      text: this.state?.text,
      lastUpdated: new Date(this.state?.lastUpdated).toLocaleString(),
    }
  },

  // MM function: receives socket notifications from node helper
  socketNotificationReceived(notificationIdentifier: string, payload): void {
    if (notificationIdentifier === SocketNotification.GREETINGS_TEXT_RESPONSE) {
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

  // Custom function: load data every 10 seconds
  scheduleUpdate(): void {
    setInterval(() => {
      this.loadData()
    }, 10000) // 10 seconds
  },

  // Custom function: send socker notification to node helper with config from user
  loadData(): void {
    Log.debug(`${this.name} is loading data`)
    this.sendSocketNotification('GREETINGS_TEXT_REQUEST', this.config)
  },
})
