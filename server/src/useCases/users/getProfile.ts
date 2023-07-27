import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: Omit<User, 'password'>
}

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userWithOutPassword = {
      ...user,
      password: undefined,
    }

    return {
      user: userWithOutPassword,
    }
  }
}
