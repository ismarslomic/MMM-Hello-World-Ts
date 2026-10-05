const Log = require('logger')

class NodeHelper {
  constructor() {
    this.sendSocketNotification = jest.fn()
    this.setExpressApp = jest.fn()
    this.setSocketIO = jest.fn()
  }

  init() {
    Log.log('Initializing new module helper ...')
  }

  start() {}
  stop() {}
  socketNotificationReceived() {}

  setName(name) {
    this.name = name
  }

  setPath(path) {
    this.path = path
  }

  // Static class methods are non-enumerable, matching the real CommonJS helper.
  static create(overrides) {
    return class extends NodeHelper {
      constructor() {
        super()
        Object.assign(this, overrides)
        this.init()
      }
    }
  }
}

module.exports = NodeHelper
