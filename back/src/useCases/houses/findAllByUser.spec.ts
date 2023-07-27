import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { FindAllByUserHouseUseCase } from './findAllByUser'

let housesRepository: HousesRepositoryInMemory
let findAllHouseUseCase: FindAllByUserHouseUseCase

describe('Gey house use case', () => {
  beforeEach(() => {
    housesRepository = new HousesRepositoryInMemory()
    findAllHouseUseCase = new FindAllByUserHouseUseCase(housesRepository)
  })

  it('Should be able to get a house', async () => {
    await housesRepository.create({
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
    await housesRepository.create({
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

    const { houses } = await findAllHouseUseCase.execute({ userId: '1235456' })

    expect(houses.length).toBe(2)
    expect(houses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'House test',
          title: 'title test',
          owner_id: '1235456',
          created_at: expect.any(Date),
        }),
        expect.objectContaining({
          description: 'House test',
          title: 'title test',
          owner_id: '1235456',
          created_at: expect.any(Date),
        }),
      ]),
    )
  })
})
