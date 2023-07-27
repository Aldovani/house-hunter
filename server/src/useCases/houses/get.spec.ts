import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { GetHouseUseCase } from './get'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { Decimal } from '@prisma/client/runtime'

let housesRepository: HousesRepositoryInMemory
let getHouseUseCase: GetHouseUseCase

describe('Gey house use case', () => {
  beforeEach(() => {
    housesRepository = new HousesRepositoryInMemory()
    getHouseUseCase = new GetHouseUseCase(housesRepository)
  })

  it('Should be able to get a house', async () => {
    const { id } = await housesRepository.create({
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

    const { house } = await getHouseUseCase.execute({ houseId: id })

    expect(house).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        buy_price: new Decimal('10000'),
        rent_price: new Decimal('500'),
        description: 'House test',
        title: 'title test',
        owner_id: '1235456',
        created_at: expect.any(Date),
      }),
    )
  })

  it('Should not be able to get a house existent', async () => {
    await expect(
      getHouseUseCase.execute({ houseId: 'id test' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
