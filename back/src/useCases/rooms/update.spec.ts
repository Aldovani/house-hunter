import { beforeEach, describe, expect, it } from 'vitest'
import { RoomsRepositoryInMemory } from '../../repositories/inMemory/roomsRepositoryInMemory'
import { UpdateRoomUseCase } from './update'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

let roomsRepository: RoomsRepositoryInMemory
let updateRoomUseCase: UpdateRoomUseCase

describe('Update room Use case', () => {
  beforeEach(() => {
    roomsRepository = new RoomsRepositoryInMemory()
    updateRoomUseCase = new UpdateRoomUseCase(roomsRepository)
  })

  it('Should be able update room', async () => {
    const { id } = await roomsRepository.create({ name: 'bathroom' })
    const { room } = await updateRoomUseCase.execute({
      name: 'Tv room',
      roomId: id,
    })

    expect(room).toEqual(
      expect.objectContaining({
        id,
        name: 'Tv room',
      }),
    )
  })

  it('Should not be able update room with roomId existed', async () => {
    await expect(
      updateRoomUseCase.execute({
        name: 'Tv room',
        roomId: 'ID-TEST',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
