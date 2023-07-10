import { compare } from 'bcrypt'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { inject, injectable } from 'tsyringe'

interface VerifyCodeForgotPasswordUseCaseRequest {
  code: string
  token: string
}

@injectable()
export class VerifyCodeForgotPasswordUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ code, token }: VerifyCodeForgotPasswordUseCaseRequest) {
    const tokenExists = await this.userTokensRepository.findByTokenAndType(
      token,
      'EMAIL_FORGOT_PASSWORD',
    )

    if (!tokenExists) {
      throw new Error()
    }

    const compareDateInHours = dayjs(new Date()).diff(
      tokenExists.created_at,
      'minutes',
    )

    if (compareDateInHours > 60) {
      this.userTokensRepository.deleteTokenById(tokenExists.id)
      throw new Error()
    }

    const isValidCode = await compare(code, tokenExists.token)

    if (!isValidCode) {
      throw new Error()
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
