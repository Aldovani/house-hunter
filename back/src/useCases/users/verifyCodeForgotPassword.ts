import { compare } from 'bcrypt'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { inject, injectable } from 'tsyringe'
import { InvalidCodeError } from '../../shared/errors/InvalidCodeError'
import { ExpiredTokenError } from '../../shared/errors/ExpiredTokenError'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

interface VerifyCodeForgotPasswordUseCaseRequest {
  code: string
  id: string
}

@injectable()
export class VerifyCodeForgotPasswordUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ code, id }: VerifyCodeForgotPasswordUseCaseRequest) {
    const tokenExists = await this.userTokensRepository.findById(id)

    if (!tokenExists) {
      throw new ResourceNotFoundError()
    }

    const compareDateInHours = dayjs(new Date()).diff(
      tokenExists.created_at,
      'minutes',
    )

    if (compareDateInHours > 60) {
      this.userTokensRepository.deleteTokenById(tokenExists.id)
      throw new ExpiredTokenError()
    }

    const isValidCode = await compare(code, tokenExists.token)

    if (!isValidCode) {
      throw new InvalidCodeError()
    }

    const tokenForgotPassword = randomUUID()
    await this.userTokensRepository.create({
      token: tokenForgotPassword,
      user_id: tokenExists.user_id,
      type_token: 'TOKEN_FORGOT_PASSWORD',
    })

    return {
      token: tokenForgotPassword,
    }
  }
}
