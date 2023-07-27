import { IUsersRepository } from '../../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { EmailAlreadyExistsError } from '../../shared/errors/EmailAlreadyExistsError'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

interface UpdateUserUseCaseRequest {
  userId: string
  userUpdate: Partial<User>
}

interface UpdateUserUseCaseResponse {
  user: User
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    userUpdate,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const isUpdateEmailDifferentUserEqual = user.email !== userUpdate.email

    if (isUpdateEmailDifferentUserEqual && userUpdate.email) {
      const emailAlreadyExists = await this.usersRepository.findByEmail(
        userUpdate.email,
      )
      if (emailAlreadyExists) {
        throw new EmailAlreadyExistsError()
      }
    }

    if (userUpdate.password) {
      const passwordHashed = await hash(userUpdate.password, 6)

      userUpdate.password = passwordHashed
    }

    const userUpdated = await this.usersRepository.save(userId, userUpdate)

    return {
      user: userUpdated,
    }
  }
}
