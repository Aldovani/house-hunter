import { beforeEach, describe, expect, it } from 'vitest'
import { RoomsRepositoryInMemory } from '../../repositories/inMemory/roomsRepositoryInMemory'
import { DeleteRoomUseCase } from './delete'

let roomsRepository: RoomsRepositoryInMemory
let deleteRoomUseCase: DeleteRoomUseCase

describe('Delete room Use case', () => {
  beforeEach(() => {
    roomsRepository = new RoomsRepositoryInMemory()
    deleteRoomUseCase = new DeleteRoomUseCase(roomsRepository)
  })

  it('Should be able update room', async () => {
    const { id } = await roomsRepository.create({ name: 'bathroom' })
    expect(
      deleteRoomUseCase.execute({
        roomId: id,
      }),
    ).toBeTruthy()
  })
})
