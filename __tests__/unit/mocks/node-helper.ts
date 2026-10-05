import { vi } from 'vitest'
import * as Log from './logger'

export default class NodeHelperMock {
  name = ''
  sendSocketNotification = vi.fn()

  init() {
    Log.log('Initializing new module helper ...')
  }

  // Static methods stay non-enumerable, just like MagicMirror's CommonJS class.
  static create(overrides: object) {
    return class extends NodeHelperMock {
      constructor() {
        super()
        Object.assign(this, overrides)
        this.init()
      }
    }
  }
}
