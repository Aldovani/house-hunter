import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { FindNearbyHousesUseCase } from './findNearby'

let housesRepository: HousesRepositoryInMemory
let findNearbyHousesUseCase: FindNearbyHousesUseCase

describe('Find nearby house use case', () => {
  beforeEach(() => {
    housesRepository = new HousesRepositoryInMemory()
    findNearbyHousesUseCase = new FindNearbyHousesUseCase(housesRepository)
  })

  it('Should be able to find nearby houses', async () => {
    await housesRepository.create({
      buy_price: 10000,
      rent_price: 500,
      description: 'House test',
      title: 'title test',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      state: 'São paulo',
      owner_id: '1235456',
      latitude: -21.521017,
      longitude: -48.391894,
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
      state: 'São paulo',
      owner_id: '1235456',
      latitude: -12.521017,
      longitude: -40.391894,
    })

    const { houses } = await findNearbyHousesUseCase.execute({
      latitude: -21.521017,
      longitude: -48.391894,
      distance: 10,
    })

    expect(houses.length).toEqual(1)
    expect(houses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          description: 'House test',
          title: 'title test',
          owner_id: '1235456',
          created_at: expect.any(Date),
        }),
      ]),
    )
  })
})
