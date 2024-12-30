const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Root directory of your project
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Points to your setup file
  testEnvironment: 'jest-environment-jsdom', // Ensure jsdom is being used for the test environment
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
