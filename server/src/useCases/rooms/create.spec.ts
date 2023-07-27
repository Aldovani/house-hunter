import { beforeEach, describe, expect, it } from 'vitest'
import { RoomsRepositoryInMemory } from '../../repositories/inMemory/roomsRepositoryInMemory'
import { CreateRoomUseCase } from './create'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'

let roomsRepository: RoomsRepositoryInMemory
let createRoomUseCase: CreateRoomUseCase

describe('Create room Use case', () => {
  beforeEach(() => {
    roomsRepository = new RoomsRepositoryInMemory()
    createRoomUseCase = new CreateRoomUseCase(roomsRepository)
  })

  it('Should be able create new room', async () => {
    const { room } = await createRoomUseCase.execute({ name: 'bathroom' })

    expect(room).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'bathroom',
      }),
    )
  })

  it('Should not be able create new room with the same name', async () => {
    await createRoomUseCase.execute({ name: 'bathroom' })

    await expect(
      createRoomUseCase.execute({ name: 'bathroom' }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistError)
  })
})
