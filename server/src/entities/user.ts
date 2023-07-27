import { User as UserPrisma } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class User implements UserPrisma {
  id!: string
  email!: string

  @Exclude()
  password!: string

  name!: string
  created_at!: Date
  avatar!: string | null
}
