import { IUsersRepository } from '../../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'
import { User, UserTokens } from '@prisma/client'
import dayjs from 'dayjs'

interface ChangePasswordUseCaseRequest {
  token: string
  password: string
}

interface ChangePasswordUseCaseResponse {
  user: User
  token: UserTokens
}

@injectable()
export class ChangePasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({
    password,
    token,
  }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
    const tokenExists = await this.userTokensRepository.findByTokenAndType(
      token,
      'TOKEN_FORGOT_PASSWORD',
    )

    if (!tokenExists) {
      throw new Error()
    }

    const compareDateInMinutes = dayjs(new Date()).diff(
      tokenExists.created_at,
      'minutes',
    )

    if (compareDateInMinutes > 15) {
      throw new Error()
    }

    const passwordHashed = await hash(password, 6)

    const user = await this.usersRepository.save(tokenExists.user_id, {
      password: passwordHashed,
    })

    const tokenValidated =
      (await this.userTokensRepository.updateValidatedAtByTokenId(
        tokenExists.id,
        new Date(),
      )) as UserTokens

    return {
      user,
      token: tokenValidated,
    }
  }
}
