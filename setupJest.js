/* eslint-disable @typescript-eslint/no-var-requires */
global.waitForAsync = () => new Promise((resolve) => setImmediate(resolve))

const { mockConsole, restoreConsole } = require('./__mocks__/console')
require('./__mocks__/logger')

beforeAll(mockConsole)

afterAll(restoreConsole)
