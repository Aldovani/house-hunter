import { beforeEach, describe, expect, it } from 'vitest'
import { RoomsRepositoryInMemory } from '../../repositories/inMemory/roomsRepositoryInMemory'
import { GetAllRoomUseCase } from './listAll'

let roomsRepository: RoomsRepositoryInMemory
let getAllRoomUseCase: GetAllRoomUseCase

describe('List all rooms Use case', () => {
  beforeEach(() => {
    roomsRepository = new RoomsRepositoryInMemory()
    getAllRoomUseCase = new GetAllRoomUseCase(roomsRepository)
  })

  it('Should be able create new room', async () => {
    await roomsRepository.create({
      name: 'bathroom',
    })
    await roomsRepository.create({
      name: 'TV room',
    })

    const { rooms } = await getAllRoomUseCase.execute()

    expect(rooms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: 'bathroom',
        }),
      ]),
    )
  })
})
