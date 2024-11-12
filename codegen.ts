import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://shopify.dev/storefront-graphql-direct-proxy/2024-10',
  documents: [
    'lib/shopify/graphql/queries/*.ts',
    'lib/shopify/graphql/mutations/*.ts',
    'lib/shopify/graphql/fragments/*.ts',
  ],
  generates: {
    'lib/shopify/graphql/generated/index.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
}

export default config
