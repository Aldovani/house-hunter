import { User } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { compare } from 'bcrypt'
import { InvalidCredencialError } from '../../shared/errors/InvalidCredencialError'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: User
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredencialError()
    }

    const isPasswordMathWithPasswordHashed = await compare(
      password,
      user.password,
    )

    if (!isPasswordMathWithPasswordHashed) {
      throw new InvalidCredencialError()
    }

    return {
      user,
    }
  }
}
