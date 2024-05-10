import { z } from 'zod'

export const ProductConditionZod = z.nativeEnum({
  ['High']: 'high',
  ['Medium']: 'medium',
  ['Low']: 'low'
} as const)

export const productSchema = z.object({
  name: z.string().min(1),
  condition: ProductConditionZod,
  descriptionShort: z.string().min(1),
  price: z.string().min(1),
  quantity: z.string().min(1),
  descriptionFull: z.string().min(1)
}).transform(({price, quantity, ...rest}) => ({
  price: +price,
  quantity: +quantity,
  ...rest
}))

export type ProductSchemaValues = z.infer<typeof productSchema>