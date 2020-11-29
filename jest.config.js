// jest.config.js
module.exports = {
  verbose: true,
  notify: false,
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.(ts|js)', '**/tests/**/*.test.(ts|js)'],
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
