module.exports = {
  preset: 'ts-jest',
  bail: true,
  testEnvironment: 'node',
  rootDir: '.',
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleDirectories: [
    'src',
    'node_modules'
  ],
  coverageReporters: ['lcov', 'json', 'text', 'html'],
  testMatch: null,
  testRegex: ["index.test.ts","parsers.test.ts"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
  testTimeout: 20000,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/dist/',
    'src/config/environment.config.ts',
    'src/infra/data/database/data-source.ts',
    'infra',
    'plugins'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/*.(spec|test).ts',
    '!src/config/environment.config.ts',
    '!src/infra/data/database/data-source.ts',
    '!src/infra/data/database/data-source-test.ts',
    '!src/service/*',
    '!src/models/*'
  ],

}