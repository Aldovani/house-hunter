import { hash } from 'bcrypt'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'
import { IMailerProvider } from '../../shared/provider/email/IMailProvider'
import { inject, injectable } from 'tsyringe'

interface ForgotPasswordUseCaseRequest {
  email: string
}
interface ForgotPasswordUseCaseResponse {
  token: string
  code: string
}

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailerProvider,
  ) {}

  async execute({
    email,
  }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error()
    }

    const code = (Math.random() + 1).toString().slice(2, 8)

    const token = await hash(code, 6)

    await this.userTokensRepository.create({
      token,
      type_token: 'EMAIL_FORGOT_PASSWORD',
      user_id: user.id,
    })

    // TODO:change
    await this.mailProvider.sendEmail({
      to: email,
      subject: 'Reset password',
      text: ` http://localhost:3000/forgot-password/
      PASSWORD:${code}
      `,
    })

    return { token, code }
  }
}
