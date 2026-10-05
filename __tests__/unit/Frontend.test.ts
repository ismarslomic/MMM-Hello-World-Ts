import ModuleProperties = Module.ModuleProperties
import { Config } from '../../src/types/Config'
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
      const second: ModuleProperties<Config> = {
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
        expect(first.state.text).toBe(text)
        expect(second.state.text).toBe('Second greeting')
      }
      expect(first.updateDom).toHaveBeenCalledTimes(2)
      expect(second.updateDom).toHaveBeenCalledTimes(2)
    })
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
    fail('Module registration call did not happen!')
  }
  const name = mockModuleRegister.mock.lastCall[0] as string
  const implementation = mockModuleRegister.mock.lastCall[1] as ModuleProperties<Config>

  // Add MM2 inherited bits into implementation
  const enhancedImplementation: ModuleProperties<Config> = {
    ...implementation,
    config: {
      text: 'Hello Ismar',
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
