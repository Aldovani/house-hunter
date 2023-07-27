import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { DeleteHouseUseCase } from './delete'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../shared/errors/PermissionError'

let housesRepository: HousesRepositoryInMemory
let deleteHouseUseCase: DeleteHouseUseCase

describe('Delete house use case', () => {
  beforeEach(() => {
    housesRepository = new HousesRepositoryInMemory()
    deleteHouseUseCase = new DeleteHouseUseCase(housesRepository)
  })

  it('Should be able to delete house', async () => {
    const { id } = await housesRepository.create({
      buy_price: 10000,
      rent_price: 500,
      description: 'House test',
      title: 'title test',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
      owner_id: '1235456',
    })

    expect(
      async () =>
        await deleteHouseUseCase.execute({ houseId: id, userId: '123456' }),
    ).toBeTruthy()
  })

  it('Should not be able to delete house existent', async () => {
    await expect(
      deleteHouseUseCase.execute({ houseId: 'test', userId: 'test' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to delete house different user', async () => {
    const { id } = await housesRepository.create({
      buy_price: 10000,
      rent_price: 500,
      description: 'House test',
      title: 'title test',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
      owner_id: '1235456',
    })
    await expect(
      deleteHouseUseCase.execute({ houseId: id, userId: 'test' }),
    ).rejects.toBeInstanceOf(PermissionError)
  })
})
