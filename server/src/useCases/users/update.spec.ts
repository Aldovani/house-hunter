import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/usersRepositoryInMemory'
import { UpdateUserUseCase } from './update'
import { compare } from 'bcrypt'
import { EmailAlreadyExistsError } from '../../shared/errors/EmailAlreadyExistsError'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

let updateUseCase: UpdateUserUseCase
let usersRepository: UsersRepositoryInMemory
let userID: string

describe('Update Use Case', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    updateUseCase = new UpdateUserUseCase(usersRepository)
    const { id } = await usersRepository.create({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })
    userID = id
  })

  it('Should be able to update email', async () => {
    const { user } = await updateUseCase.execute({
      userId: userID,
      userUpdate: {
        email: 'aldovani1234@gmail.com',
      },
    })

    expect(user).toEqual(
      expect.objectContaining({
        email: 'aldovani1234@gmail.com',
      }),
    )
  })

  it('Should be able to update password', async () => {
    const { user } = await updateUseCase.execute({
      userId: userID,
      userUpdate: {
        password: 'password_test',
      },
    })

    const isPasswordMatch = await compare('password_test', user.password)

    expect(isPasswordMatch).toBe(true)
  })

  it('Should be able to update name', async () => {
    const { user } = await updateUseCase.execute({
      userId: userID,
      userUpdate: {
        name: 'aldovani costa',
      },
    })

    expect(user.name).toEqual('aldovani costa')
  })

  it('Should not be able to update email already used for other user', async () => {
    await usersRepository.create({
      email: 'dodo@gmail.com',
      name: 'Dodo',
      password: '12345',
    })

    await expect(
      updateUseCase.execute({
        userId: userID,
        userUpdate: {
          email: 'dodo@gmail.com',
        },
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('Should be able to update all fields', async () => {
    const { user } = await updateUseCase.execute({
      userId: userID,
      userUpdate: {
        name: 'Dodo',
        email: 'dodo@gmail.com',
        password: '123456789',
      },
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Dodo',
        email: 'dodo@gmail.com',
        password: expect.any(String),
      }),
    )
  })

  it('Should not be able to update user existed', async () => {
    await expect(
      updateUseCase.execute({
        userId: 'user-id-test',
        userUpdate: {
          email: 'dodo@gmail.com',
        },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
