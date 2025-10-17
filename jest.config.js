// jest.config.js
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // 👇 AÑADE ESTA LÍNEA 👇
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',

    // Mantén tu mock de imágenes existente
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};