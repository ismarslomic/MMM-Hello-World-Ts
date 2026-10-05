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
        tsconfig: 'tsconfig.unit.json',
        sourceMap: true,
        inlineSourceMap: true,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/setupJest.js'],
}
