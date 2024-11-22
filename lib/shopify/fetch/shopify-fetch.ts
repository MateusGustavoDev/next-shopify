import 'server-only'
import { SHOPIFY_GRAPHQL_API_ENDPOINT } from '@/lib/constants'
import { z } from 'zod'

const { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env
const endpoint = `https://${SHOPIFY_STORE_DOMAIN}${SHOPIFY_GRAPHQL_API_ENDPOINT}`
const key = SHOPIFY_STOREFRONT_ACCESS_TOKEN

const ErrorsSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
      extensions: z.object({
        code: z.string(),
      }),
    }),
  ),
})

type Variables = object | undefined

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache
  headers?: HeadersInit
  query: string
  tags?: string[]
  variables?: Variables
}): Promise<{ errors: { message: string } | undefined; data: T | undefined }> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    })

    const body = await result.json()

    const errorParseResult = ErrorsSchema.safeParse(body)

    if (errorParseResult.success) {
      throw new Error(`API returned error code:  + ${body.errors[0].extensions.code}`)
    }

    if (body.data) {
      return {
        data: body.data,
        errors: undefined,
      }
    }

    throw new Error('Error with data returned from API')
  } catch (e) {
    const error = e as Error
    console.error('shopifyFetch error: ' + error.message)
    return {
      data: undefined,
      errors: { message: `shopifyFetch error: ' + ${error.message}` },
    }
  }
}
