module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'babel-jest',
  // },
  moduleDirectories: ['<rootDir>', 'node_modules'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest',
};
