import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { UpdateHouseUseCase } from './update'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { Decimal } from '@prisma/client/runtime'

let housesRepository: HousesRepositoryInMemory
let updateHouseUseCase: UpdateHouseUseCase

describe('Update house use case', () => {
  beforeEach(() => {
    housesRepository = new HousesRepositoryInMemory()
    updateHouseUseCase = new UpdateHouseUseCase(housesRepository)
  })

  it('Should be able to update  house', async () => {
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

    const { house } = await updateHouseUseCase.execute({
      houseId: id,
      userId: '1235456',
      houseData: {
        address: 'Street number 15',
        state: 'NY',
        city: 'New York',
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
        address: 'Street number 15',
        state: 'NY',
        city: 'New York',
        created_at: expect.any(Date),
      }),
    )
  })

  it('Should not be able to update house existent', async () => {
    await expect(
      updateHouseUseCase.execute({
        houseId: '1235',
        userId: '1235456',
        houseData: {
          address: 'Street number 15',
          city: 'New York',
        },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to update house different user', async () => {
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

    await expect(
      updateHouseUseCase.execute({
        houseId: id,
        userId: '5652',
        houseData: {
          address: 'Street number 15',
          state: 'NY',
          city: 'New York',
        },
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
