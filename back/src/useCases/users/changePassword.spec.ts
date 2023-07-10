import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/usersRepositoryInMemory'
import { UserTokensRepositoryInMemory } from '../../repositories/inMemory/userTokensRepositoryInMemory'
import { randomUUID } from 'crypto'
import { ChangePasswordUseCase } from './changePassword'

let changePasswordUseCase: ChangePasswordUseCase
let usersRepository: UsersRepositoryInMemory
let userTokensRepository: UserTokensRepositoryInMemory

describe('Update Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    userTokensRepository = new UserTokensRepositoryInMemory()
    changePasswordUseCase = new ChangePasswordUseCase(
      usersRepository,
      userTokensRepository,
    )
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to update password', async () => {
    const { id } = await usersRepository.create({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })

    const { token } = await userTokensRepository.create({
      token: randomUUID(),
      user_id: id,
      type_token: 'TOKEN_FORGOT_PASSWORD',
    })

    const { user, token: tokenValidate } = await changePasswordUseCase.execute({
      token,
      password: '123456789',
    })

    expect(user).toEqual(
      expect.objectContaining({
        password: expect.any(String),
      }),
    )
    expect(tokenValidate).toEqual(
      expect.objectContaining({
        validated_at: expect.any(Date),
      }),
    )
  })

  it('Should  not be able to update password with token invalid', async () => {
    const { id } = await usersRepository.create({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })

    await userTokensRepository.create({
      token: randomUUID(),
      user_id: id,
      type_token: 'TOKEN_FORGOT_PASSWORD',
    })

    await expect(
      changePasswordUseCase.execute({
        token: 'token-invalid',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should  not be able to update password after 15 minutes', async () => {
    vi.setSystemTime(new Date(2023, 5, 6, 12))

    const { id } = await usersRepository.create({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })

    const { token } = await userTokensRepository.create({
      token: randomUUID(),
      user_id: id,
      type_token: 'TOKEN_FORGOT_PASSWORD',
    })

    vi.advanceTimersByTime(1000 * 60 * 16)

    await expect(
      changePasswordUseCase.execute({
        token,
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
