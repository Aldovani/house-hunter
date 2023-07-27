import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/usersRepositoryInMemory'
import { hash } from 'bcrypt'
import { InvalidCredencialError } from '../../shared/errors/InvalidCredencialError'

let authenticateUseCase: AuthenticateUseCase
let usersRepository: UsersRepositoryInMemory

describe('Authenticate use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'aldovani@gmail.com',
      password: await hash('123456', 6),
      name: 'Aldovani',
    })

    const { user } = await authenticateUseCase.execute({
      email: 'aldovani@gmail.com',
      password: '123456',
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Aldovani',
        email: 'aldovani@gmail.com',
        id: expect.any(String),
      }),
    )
  })

  it('should not be able to authenticate with email existed', async () => {
    await expect(
      authenticateUseCase.execute({
        email: 'aldovani@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      email: 'aldovani@gmail.com',
      password: '123456',
      name: 'Aldovani',
    })

    await expect(
      authenticateUseCase.execute({
        email: 'aldovani@gmail.com',
        password: '1234565',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError)
  })
})
