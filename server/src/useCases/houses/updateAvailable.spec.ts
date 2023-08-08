import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateAvailableHouseUseCase } from './updateAvailable'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { HouseRoomsRepositoryInMemory } from '../../repositories/inMemory/houseRoomsRepositoryInMemory'
import { HouseImagesRepositoryInMemory } from '../../repositories/inMemory/houseImagesRepositoryInMemory'
import { ContactsRepositoryInMemory } from '../../repositories/inMemory/contactsRepositoryInMemory'

let housesRepositoryInMemory: HousesRepositoryInMemory
let houseRoomsRepositoryInMemory: HouseRoomsRepositoryInMemory
let houseImagesRepositoryInMemory: HouseImagesRepositoryInMemory
let contactsRepositoryInMemory: ContactsRepositoryInMemory
let updateStatusHouseUseCase: UpdateAvailableHouseUseCase

describe('Update Status use Case', () => {
  beforeEach(async () => {
    housesRepositoryInMemory = new HousesRepositoryInMemory()
    houseRoomsRepositoryInMemory = new HouseRoomsRepositoryInMemory()
    houseImagesRepositoryInMemory = new HouseImagesRepositoryInMemory()
    contactsRepositoryInMemory = new ContactsRepositoryInMemory()
    updateStatusHouseUseCase = new UpdateAvailableHouseUseCase(
      housesRepositoryInMemory,
      houseRoomsRepositoryInMemory,
      houseImagesRepositoryInMemory,
      contactsRepositoryInMemory,
    )

    await housesRepositoryInMemory.create({
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
      owner_id: '123456',
      id: '123456',
    })
  })

  it('Should be able to update status', async () => {
    await houseRoomsRepositoryInMemory.updateOrCreate({
      house_id: '123456',
      quantity: 2,
      room_id: '123456',
    })
    await houseImagesRepositoryInMemory.save('123456', 'filename test')
    await houseImagesRepositoryInMemory.save('123456', 'filename test')
    await houseImagesRepositoryInMemory.save('123456', 'filename test')
    await houseImagesRepositoryInMemory.save('123456', 'filename test')
    await houseImagesRepositoryInMemory.save('123456', 'filename test')

    await contactsRepositoryInMemory.createOrUpdate({
      houseId: '123456',
      cellphone: '16994175820',
    })

    const { status } = await updateStatusHouseUseCase.execute({
      houseId: '123456',
      status: true,
      userId: '123456',
    })
    expect(status).toBeTruthy()
  })

  it('Should not be able to update status', async () => {
    await expect(
      updateStatusHouseUseCase.execute({
        houseId: '123456',
        status: true,
        userId: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
