import { User, Prisma } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'
import { prisma } from '../../libs/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  async save(id: string, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async updateAvatarById(id: string, fileName: string): Promise<User | null> {
    return await prisma.user.update({
      where: { id },
      data: {
        avatar: fileName,
      },
    })
  }
}
