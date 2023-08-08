import { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  updateAvatarById(id: string, fileName: string | null): Promise<User | null>
  save(id: string, data: Partial<User>): Promise<User>
}
