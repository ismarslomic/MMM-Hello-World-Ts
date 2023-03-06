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
