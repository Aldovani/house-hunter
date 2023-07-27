import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { CreateHouseUseCase } from './create'
import { Decimal } from '@prisma/client/runtime'

let housesRepository: HousesRepositoryInMemory
let createHouseUseCase: CreateHouseUseCase

describe('Create house use case', () => {
  beforeEach(() => {
    housesRepository = new HousesRepositoryInMemory()
    createHouseUseCase = new CreateHouseUseCase(housesRepository)
  })

  it('Should be able to create new HousesRepositoryInMemory', async () => {
    const { house } = await createHouseUseCase.execute({
      userId: '1235456',
      data: {
        buyPrice: 10000,
        rentPrice: 500,
        description: 'House test',
        title: 'title test',
        address: 'Street test',
        addressNumber: 158,
        city: 'Dobrada',
        district: 'Portal do sol',
        latitude: 15.8,
        longitude: 8.7,
        state: 'São paulo',
      },
    })

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
})
