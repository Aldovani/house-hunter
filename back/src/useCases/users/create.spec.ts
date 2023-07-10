import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/usersRepositoryInMemory'
import { compare } from 'bcrypt'

let createUserUseCase: CreateUserUseCase
let usersRepository: UsersRepositoryInMemory

describe('Create Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('Should be able to create a new user', async () => {
    const { user } = await createUserUseCase.execute({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user).toEqual(
      expect.objectContaining({
        email: 'AldovaniHcosta@mail.com',
        name: 'Alodvani',
      }),
    )
  })

  it('Should not be able to create new user with the same email', async () => {
    await createUserUseCase.execute({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })
    await expect(
      createUserUseCase.execute({
        email: 'AldovaniHcosta@mail.com',
        name: 'Alodvani',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to verify the password hashed', async () => {
    const { user } = await createUserUseCase.execute({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })

    const passwordMatch = await compare('12345', user.password)

    expect(passwordMatch).toBe(true)
  })
})
