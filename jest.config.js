/** @type {import('jest').Config} */

module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
