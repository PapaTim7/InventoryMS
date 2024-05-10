import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(4)
})

export type LoginSchemaValues = z.infer<typeof loginSchema>