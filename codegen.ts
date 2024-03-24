import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/types/types.graphql-gen.ts': {
      plugins: ['typescript']
    },
    'src/generated': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.graphql-gen.ts',
        baseTypesPath: './types/types.graphql-gen.ts'
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-resolvers',
        'typescript-apollo-angular'
      ],
      config: {
        addExplicitOverride: true
      }
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  },
  config: {
    addExplicitOverride: true
  }
}

export default config
