module.exports = {
  setupFiles: ['./__mocks__/client.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'typescript-babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  testRegex: '/__tests__/.*\\.(ts|tsx|js)$',
  moduleNameMapper: {
    'fixtures/(.*)': '<rootDir>/fixtures/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules', '.']
};
