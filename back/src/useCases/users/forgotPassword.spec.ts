import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/usersRepositoryInMemory'
import { ForgotPasswordUseCase } from './forgotPassword'
import { UserTokensRepositoryInMemory } from '../../repositories/inMemory/userTokensRepositoryInMemory'
import { MailProviderInMemory } from '../../shared/provider/email/inMemory/mailProviderInMemory'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

let forgotPasswordUseCase: ForgotPasswordUseCase
let emailProvider: MailProviderInMemory
let usersRepository: UsersRepositoryInMemory
let userTokensRepository: UserTokensRepositoryInMemory

describe('Forgot password Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    userTokensRepository = new UserTokensRepositoryInMemory()
    emailProvider = new MailProviderInMemory()
    forgotPasswordUseCase = new ForgotPasswordUseCase(
      usersRepository,
      userTokensRepository,
      emailProvider,
    )
  })

  it('Should be able to create a new request to reset password ', async () => {
    await usersRepository.create({
      email: 'aldovani@gmail.com',
      name: 'Aldovani',
      password: '123456',
    })

    const { token } = await forgotPasswordUseCase.execute({
      email: 'aldovani@gmail.com',
    })

    expect(token).toEqual(expect.any(String))
  })

  it('Should no be able to create a new request to email existent', async () => {
    await expect(
      forgotPasswordUseCase.execute({
        email: 'aldovani@gmail.com',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
