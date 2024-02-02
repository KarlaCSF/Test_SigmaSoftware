module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  setupFilesAfterEnv: ['<rootDir>/singleton.ts']
}
