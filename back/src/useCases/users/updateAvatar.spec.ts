import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/usersRepositoryInMemory'
import { UpdateAvatarUseCase } from './updateAvatar'
import { LocalStorageProvider } from '../../shared/provider/storage/implementations/LocalStorageProvider'

let updateAvatarUseCase: UpdateAvatarUseCase
let usersRepository: UsersRepositoryInMemory
let localStorageProvider: LocalStorageProvider

describe('Update avatar Use Case', () => {
  beforeEach(() => {
    localStorageProvider = new LocalStorageProvider()
    usersRepository = new UsersRepositoryInMemory()
    updateAvatarUseCase = new UpdateAvatarUseCase(
      usersRepository,
      localStorageProvider,
    )
  })

  it.todo('Should be able to update avatar', async () => {
    const user = await usersRepository.create({
      email: 'AldovaniHcosta@mail.com',
      name: 'Alodvani',
      password: '12345',
    })

    const { file } = await updateAvatarUseCase.execute({
      file: 'test',
      userId: user.id,
    })

    expect(file).toEqual(expect.any(String))
  })
})
