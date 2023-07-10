import { User, Prisma } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'
import { randomUUID } from 'crypto'

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async save(id: string, data: Partial<User>): Promise<User> {
    const user = this.users.find((user) => user.id === id) as User

    const userUpdated = Object.assign(user, data)

    return userUpdated
  }

  async updateAvatarById(id: string, fileName: string): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex === -1) {
      return null
    }
    this.users[userIndex].avatar = fileName

    return this.users[userIndex]
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      password: data.password,
      created_at: new Date(),
      avatar: null,
    }

    this.users.push(user)

    return user
  }
}
