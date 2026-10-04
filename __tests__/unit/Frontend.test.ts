import { FrontendModule } from '../../src/types/FrontendModule'
import { MM2ModuleHelper } from '../../__mocks__/Module'

const mockModuleRegister = jest.fn()
const moduleMock: MM2ModuleHelper = { register: mockModuleRegister }
global.Module = moduleMock
import '../../src/frontend/Frontend'
const sendSocketNotificationMock = jest.fn()

describe('Frontend', () => {
  it('should register client implementation', () => {
    expect(mockModuleRegister).toHaveBeenCalled()

    const { name, implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
    expect(name).toBe('MMM-Hello-World-Ts')
    expect(implementation.defaults).toEqual({
      text: 'Hello World!',
      updateInterval: 10000,
      pauseWhenHidden: false,
    })
    expect(typeof implementation.start).toBe('function')
    expect(typeof implementation.getStyles).toBe('function')
    expect(typeof implementation.getTemplate).toBe('function')
    expect(typeof implementation.getTemplateData).toBe('function')
    expect(typeof implementation.socketNotificationReceived).toBe('function')
  })

  describe('first rendering', () => {
    it('shows configured text before the first socket response', () => {
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
      expect(implementation.getTemplateData()).toEqual({ text: 'Hello Ismar', lastUpdated: '' })
    })

    it('renders text and a formatted date after a socket response', () => {
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
      const lastUpdated = Date.UTC(2026, 9, 4, 12)
      implementation.socketNotificationReceived('GREETINGS_TEXT_RESPONSE', {
        identifier: 'module_1',
        text: 'Updated greeting',
        lastUpdated,
      })
      expect(implementation.getTemplateData()).toEqual({
        text: 'Updated greeting',
        lastUpdated: new Date(lastUpdated).toLocaleString(),
      })
      expect(implementation.updateDom).toHaveBeenCalledTimes(1)
    })
  })

  describe('socket instance isolation', () => {
    it('includes the instance identifier with the request', () => {
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
      implementation.loadData()
      expect(sendSocketNotificationMock).toHaveBeenLastCalledWith('GREETINGS_TEXT_REQUEST', {
        identifier: 'module_1',
        config: implementation.config,
      })
    })

    it('keeps independent data across interleaved responses', () => {
      const first = checkAndExtractRegistration(mockModuleRegister.mock.lastCall).implementation
      const second: FrontendModule = {
        ...checkAndExtractRegistration(mockModuleRegister.mock.lastCall).implementation,
        identifier: 'module_2',
      }
      for (const text of ['First greeting', 'Updated first greeting']) {
        const firstResponse = { identifier: 'module_1', text, lastUpdated: 1 }
        const secondResponse = { identifier: 'module_2', text: 'Second greeting', lastUpdated: 2 }
        for (const instance of [first, second]) {
          instance.socketNotificationReceived('GREETINGS_TEXT_RESPONSE', firstResponse)
          instance.socketNotificationReceived('GREETINGS_TEXT_RESPONSE', secondResponse)
        }
        expect(first.getTemplateData().text).toBe(text)
        expect(second.getTemplateData().text).toBe('Second greeting')
      }
      expect(first.updateDom).toHaveBeenCalledTimes(2)
      expect(second.updateDom).toHaveBeenCalledTimes(2)
    })
  })

  it.each([
    null,
    {},
    { identifier: 'module_1', text: 'Hello', lastUpdated: NaN },
    { identifier: 'module_1', text: 'Hello', lastUpdated: 1e30 },
  ])('ignores malformed socket responses: %p', (payload) => {
    const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
    implementation.socketNotificationReceived('GREETINGS_TEXT_RESPONSE', payload)
    expect(implementation.getTemplateData()).toEqual({ text: 'Hello Ismar', lastUpdated: '' })
    expect(implementation.updateDom).not.toHaveBeenCalled()
  })

  describe('polling lifecycle', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      sendSocketNotificationMock.mockClear()
    })

    afterEach(() => {
      jest.clearAllTimers()
      jest.useRealTimers()
    })

    it('uses the configured interval and keeps only one timer after repeated start', () => {
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
      implementation.config.updateInterval = 2000
      implementation.start()
      implementation.start()
      expect(jest.getTimerCount()).toBe(1)
      sendSocketNotificationMock.mockClear()
      jest.advanceTimersByTime(1999)
      expect(sendSocketNotificationMock).not.toHaveBeenCalled()
      jest.advanceTimersByTime(1)
      expect(sendSocketNotificationMock).toHaveBeenCalledTimes(1)
    })

    it('pauses when opted in and refreshes once on resume', () => {
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
      implementation.config.pauseWhenHidden = true
      implementation.start()
      implementation.suspend()
      sendSocketNotificationMock.mockClear()
      jest.advanceTimersByTime(30000)
      expect(sendSocketNotificationMock).not.toHaveBeenCalled()
      expect(jest.getTimerCount()).toBe(0)
      implementation.resume()
      implementation.resume()
      expect(sendSocketNotificationMock).toHaveBeenCalledTimes(1)
      expect(jest.getTimerCount()).toBe(1)
      jest.advanceTimersByTime(10000)
      expect(sendSocketNotificationMock).toHaveBeenCalledTimes(2)
    })

    it('continues polling while hidden by default', () => {
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
      implementation.start()
      implementation.suspend()
      sendSocketNotificationMock.mockClear()
      jest.advanceTimersByTime(10000)
      expect(sendSocketNotificationMock).toHaveBeenCalledTimes(1)
      implementation.resume()
      expect(jest.getTimerCount()).toBe(1)
      expect(sendSocketNotificationMock).toHaveBeenCalledTimes(1)
    })

    it.each([0, -1, NaN, Infinity, 2147483648, 1.5])(
      'falls back to the default for invalid intervals: %p',
      (updateInterval) => {
        const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)
        implementation.config.updateInterval = updateInterval
        implementation.startPolling()
        jest.advanceTimersByTime(9999)
        expect(sendSocketNotificationMock).not.toHaveBeenCalled()
        jest.advanceTimersByTime(1)
        expect(sendSocketNotificationMock).toHaveBeenCalledTimes(1)
      }
    )
  })

  describe('getStyles overriden function', () => {
    it('should return correct styles', () => {
      // given
      const {
        implementation: { getStyles },
      } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)

      // when-then
      expect(getStyles()).toEqual(['/file/css/MMM-Hello-World-Ts.css'])
    })
  })

  describe('getTemplate overriden function', () => {
    it('should return correct template', () => {
      // given
      const {
        implementation: { getTemplate },
      } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall)

      // when-then
      expect(getTemplate()).toEqual('templates/MMM-Hello-World-Ts.njk')
    })
  })
})

const checkAndExtractRegistration = (call?: unknown) => {
  if (!call) {
    throw new Error('Module registration call did not happen!')
  }
  const name = mockModuleRegister.mock.lastCall[0] as string
  const implementation = mockModuleRegister.mock.lastCall[1] as FrontendModule

  // Add MM2 inherited bits into implementation
  const enhancedImplementation: FrontendModule = {
    ...implementation,
    name: 'MMM-Hello-World-Ts',
    config: {
      text: 'Hello Ismar',
      updateInterval: 10000,
      pauseWhenHidden: false,
    },
    identifier: 'module_1',
    updateDom: jest.fn(),
    file: (fileName: string) => `/file/${fileName}`,
    sendSocketNotification: sendSocketNotificationMock,
  }
  // Make use of this
  enhancedImplementation.getStyles = enhancedImplementation.getStyles.bind(enhancedImplementation)
  enhancedImplementation.start = enhancedImplementation.start.bind(enhancedImplementation)

  return {
    name,
    implementation: enhancedImplementation,
  }
}
