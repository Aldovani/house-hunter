import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/usersRepositoryInMemory'
import { GetUserProfileUseCase } from './getProfile'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

let getProfileUseCase: GetUserProfileUseCase
let usersRepository: UsersRepositoryInMemory

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    getProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('Should be able to get Profile user', async () => {
    const { id } = await usersRepository.create({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })

    const { user } = await getProfileUseCase.execute({
      userId: id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user).toEqual(
      expect.objectContaining({
        email: 'AldovaniHcosta@mail.com',
        name: 'Alodvani',
      }),
    )
  })

  it('Should not be able to get Profile user existent', async () => {
    await expect(
      getProfileUseCase.execute({
        userId: 'id-test',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
