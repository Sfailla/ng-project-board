module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@angular|apollo-angular|@ionic/angular|@ionic/core|@stencil/core|ionicons)'
  ],
  rootDir: '.',
  moduleNameMapper: {
    '^@shared/components$': '<rootDir>/src/app/shared/components/index.ts',
    '^@shared/services$': '<rootDir>/src/app/shared/services/index.ts',
    '^@shared/directives$': '<rootDir>/src/app/shared/directives/index.ts',
    '^@shared/types$': '<rootDir>/src/app/shared/types/index.ts',
    '^@shared/utils$': '<rootDir>/src/app/shared/utils/index.ts',
    '^@generated/mutations$': '<rootDir>/src/generated/mutations/index.ts',
    '^@generated/queries$': '<rootDir>/src/generated/queries/index.ts',
    '^@generated/types$': '<rootDir>/src/generated/types/index.ts',
    '^@auth/services$': '<rootDir>/src/app/auth/services/index.ts'
  },
  modulePathIgnorePatterns: ['dist'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': [
      'jest-preset-angular',
      {
        astTransformers: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer'
        ]
      }
    ]
  },
  coverageReporters: ['html', 'text-summary', 'lcov']
}
