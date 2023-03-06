import { NodeHelperModule } from 'node_helper'
import * as Log from 'logger'
import { Config } from '../../src/types/Config'
import { SocketNotification } from '../../src/constants/SocketNotifications'

describe('Backend', () => {
  let helper: NodeHelperModule
  let config: Config
  let mockedSendSocketNotification: jest.MockedFunction<typeof helper.sendSocketNotification>

  beforeEach(() => {
    helper = require('../../src/backend/Backend')
    helper.setName('MMM-Hello-World-Ts')

    // Mock the MMM sendSocketNotification function which returns data back to the frontend
    mockedSendSocketNotification = helper.sendSocketNotification as jest.MockedFunction<
      typeof helper.sendSocketNotification
    >

    config = {
      text: 'Hello World!',
    }

    jest.useFakeTimers().setSystemTime(new Date('2023-03-06T09:00:00'))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('printing to console when starting the Backend module', () => {
    helper.start()
    expect(Log.debug).toHaveBeenCalledWith(`${helper.name} is started!`)
  })

  test('sending greetings socket notification', async () => {
    helper.socketNotificationReceived(SocketNotification.GREETINGS_TEXT_REQUEST, config)
    expect(mockedSendSocketNotification.mock.calls[0][0]).toBe(SocketNotification.GREETINGS_TEXT_RESPONSE)
    expect(mockedSendSocketNotification.mock.calls[0][1].text).toBe('MMM-Hello-World-Ts says: Hello World!')
  })
})
