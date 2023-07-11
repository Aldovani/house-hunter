import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { UserTokensRepositoryInMemory } from '../../repositories/inMemory/userTokensRepositoryInMemory'
import { VerifyCodeForgotPasswordUseCase } from './verifyCodeForgotPassword'
import { ForgotPasswordUseCase } from './forgotPassword'
import { MailProviderInMemory } from '../../shared/provider/email/inMemory/mailProviderInMemory'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/usersRepositoryInMemory'
import { ExpiredTokenError } from '../../shared/errors/ExpiredTokenError'
import { InvalidCodeError } from '../../shared/errors/InvalidCodeError'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

let verifyCodeForgotPasswordUseCase: VerifyCodeForgotPasswordUseCase
let userTokensRepository: UserTokensRepositoryInMemory

let forgotPasswordUseCase: ForgotPasswordUseCase
let emailProvider: MailProviderInMemory
let usersRepository: UsersRepositoryInMemory

describe('Forgot password Use Case', () => {
  beforeEach(() => {
    userTokensRepository = new UserTokensRepositoryInMemory()

    emailProvider = new MailProviderInMemory()
    usersRepository = new UsersRepositoryInMemory()
    forgotPasswordUseCase = new ForgotPasswordUseCase(
      usersRepository,
      userTokensRepository,
      emailProvider,
    )

    verifyCodeForgotPasswordUseCase = new VerifyCodeForgotPasswordUseCase(
      userTokensRepository,
    )
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to verify code', async () => {
    const user = await usersRepository.create({
      email: 'aldovani@gmail.com',
      name: 'Aldovani',
      password: '123456',
    })
    const { code, token: forgotToken } = await forgotPasswordUseCase.execute({
      email: user.email,
    })

    const { token } = await verifyCodeForgotPasswordUseCase.execute({
      code,
      token: forgotToken,
    })

    expect(token).toEqual(expect.any(String))
  })

  it('should not be able to verify code with token existent', async () => {
    await expect(
      verifyCodeForgotPasswordUseCase.execute({
        code: 'test',
        token: 'teste',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to verify code with invalid code', async () => {
    const user = await usersRepository.create({
      email: 'aldovani@gmail.com',
      name: 'Aldovani',
      password: '123456',
    })
    const { token: forgotToken } = await forgotPasswordUseCase.execute({
      email: user.email,
    })

    await expect(
      verifyCodeForgotPasswordUseCase.execute({
        code: 'test',
        token: forgotToken,
      }),
    ).rejects.toBeInstanceOf(InvalidCodeError)
  })

  it('should not be able to verify code after 1 hour', async () => {
    vi.setSystemTime(new Date(2023, 5, 6, 12))

    const user = await usersRepository.create({
      email: 'aldovani@gmail.com',
      name: 'Aldovani',
      password: '123456',
    })
    const { code, token } = await forgotPasswordUseCase.execute({
      email: user.email,
    })
    vi.advanceTimersByTime(1000 * 60 * 61)

    await expect(
      verifyCodeForgotPasswordUseCase.execute({
        code,
        token,
      }),
    ).rejects.toBeInstanceOf(ExpiredTokenError)
  })
})
