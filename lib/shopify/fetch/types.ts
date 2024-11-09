import {
  CurrencyCode,
  Image,
  Maybe,
  MoneyV2,
  PageInfo,
  ProductFragment,
  ProductOption,
  SelectedOption,
} from '../graphql/generated'

export type ProductType = ProductFragment

export type ProductOptionType = {
  id: string
  name: string
  optionValues: Array<{
    id: string
    name: string
    swatch?: {
      color?: any | null
    } | null
  }>
}

export type ImageType = Pick<Image, 'url' | 'altText' | 'height' | 'width'>

export type PageInfoType = Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'endCursor' | 'startCursor'>

export type ProductVariantType = {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable?: number | null
  selectedOptions: Array<{
    name: string
    value: string
  }>
  price: {
    amount: any
    currencyCode: CurrencyCode
  }
  compareAtPrice?: {
    amount: any
    currencyCode: CurrencyCode
  } | null
  image?: {
    url: any
  } | null
}

export type CollectionProductType = {
  title: string
  products: ProductType[]
  pageInfo: PageInfoType
}

type LineType = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: Pick<SelectedOption, 'name' | 'value'>[]
    product: ProductType
  }
}

export type CartType = {
  id: string
  createdAt: string
  updateAt: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: Pick<MoneyV2, 'amount' | 'currencyCode'>
    subtotalAmount: Pick<MoneyV2, 'amount' | 'currencyCode'>
    totalTaxAmount?: Maybe<Pick<MoneyV2, 'amount' | 'currencyCode'>> | undefined
    totalDutyAmount?: Maybe<Pick<MoneyV2, 'amount' | 'currencyCode'>> | undefined
  }
  lines: LineType[]
}

type Collection = {
  cursor: string
  id: string
  title: string
  handle: string
}

export type CollectionsType = {
  collections: Collection[]
}

export type ActionStateType = {
  errors: { message: string } | undefined
}

export type SearchProductsType = {
  products: ProductType[]
  pageInfo: PageInfo
}
