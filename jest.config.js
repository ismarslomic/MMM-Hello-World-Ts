module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testRegex: '(/__tests__/unit/.*)\\.test.ts$',
  testPathIgnorePatterns: ['setupJest.js'],
  collectCoverage: false,
  collectCoverageFrom: ['./src/**/*.ts'],
  transform: {
  	'^.+\\.tsx?$': [
	  'ts-jest',
      {
        sourceMap: true,
        inlineSourceMap: true
      }
    ]
  },
  setupFilesAfterEnv: ['<rootDir>/setupJest.js']
}
