import { afterEach, beforeEach, describe, expect, test, vi, type MockedFunction } from 'vitest'
import Helper from '../../src/backend/Backend'
import { loadBuiltHelper } from './helpers/load-built-helper'
import { NodeHelperModule } from 'node_helper'
import * as Log from 'logger'
import { Config } from '../../src/types/Config'
import { SocketNotification } from '../../src/constants/SocketNotifications'

describe('Backend', () => {
  let helper: NodeHelperModule
  let config: Config
  let mockedSendSocketNotification: MockedFunction<typeof helper.sendSocketNotification>

  beforeEach(() => {
    helper = new Helper()
    Object.assign(helper, { name: 'MMM-Hello-World-Ts' })

    // Mock the MMM sendSocketNotification function which returns data back to the frontend
    mockedSendSocketNotification = helper.sendSocketNotification as MockedFunction<typeof helper.sendSocketNotification>

    config = {
      text: 'Hello World!',
      updateInterval: 10000,
      pauseWhenHidden: false,
    }

    vi.useFakeTimers().setSystemTime(new Date('2023-03-06T09:00:00'))
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  test('the generated CommonJS helper preserves the static create method', () => {
    // Loading the distributed file catches bundler interop errors that TS source tests miss.
    const BuiltHelper = loadBuiltHelper()
    const builtHelper = new BuiltHelper()
    Object.assign(builtHelper, { name: 'MMM-Hello-World-Ts' })
    builtHelper.socketNotificationReceived(SocketNotification.GREETINGS_TEXT_REQUEST, {
      identifier: 'built_instance',
      config,
    })
    expect(builtHelper.sendSocketNotification).toHaveBeenCalledWith(SocketNotification.GREETINGS_TEXT_RESPONSE, {
      identifier: 'built_instance',
      text: 'MMM-Hello-World-Ts says: Hello World!',
      lastUpdated: Date.now(),
    })
  })

  test('printing to console when starting the Backend module', () => {
    helper.start()
    expect(Log.debug).toHaveBeenCalledWith(`${helper.name} is started!`)
  })

  test.each([null, {}, { identifier: 'module_1', config: null }, { identifier: 'module_1', config: { text: 42 } }])(
    'ignores malformed requests: %p',
    (payload) => {
      helper.socketNotificationReceived(SocketNotification.GREETINGS_TEXT_REQUEST, payload)
      expect(mockedSendSocketNotification).not.toHaveBeenCalled()
    }
  )

  test('sending greetings socket notification', async () => {
    helper.socketNotificationReceived(SocketNotification.GREETINGS_TEXT_REQUEST, { identifier: 'module_1', config })
    expect(mockedSendSocketNotification.mock.calls[0][0]).toBe(SocketNotification.GREETINGS_TEXT_RESPONSE)
    expect(mockedSendSocketNotification.mock.calls[0][1].identifier).toBe('module_1')
    expect(mockedSendSocketNotification.mock.calls[0][1].text).toBe('MMM-Hello-World-Ts says: Hello World!')
  })
})
