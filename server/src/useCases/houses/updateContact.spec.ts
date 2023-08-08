import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { UpdateContactHouseUseCase } from './updateContact'
import { ContactsRepositoryInMemory } from '../../repositories/inMemory/contactsRepositoryInMemory'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../shared/errors/PermissionError'

let contactsRepository: ContactsRepositoryInMemory
let housesRepository: HousesRepositoryInMemory
let updateContactHouseUseCase: UpdateContactHouseUseCase

describe('Update house contact use case', () => {
  beforeEach(() => {
    contactsRepository = new ContactsRepositoryInMemory()
    housesRepository = new HousesRepositoryInMemory()
    updateContactHouseUseCase = new UpdateContactHouseUseCase(
      housesRepository,
      contactsRepository,
    )
  })

  it('Should be able to create  contact for a house', async () => {
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
      owner_id: '123456',
      latitude: -12.521017,
      longitude: -40.391894,
    })

    const { contact } = await updateContactHouseUseCase.execute({
      userId: '123456',
      houseId: id,
      contacts: {
        cellphone: 's',
      },
    })

    expect(contact).toEqual(
      expect.objectContaining({
        house_id: id,
        cellphone: 's',
        id: expect.any(String),
      }),
    )
  })

  it('should be able to update a contact for a house existent', async () => {
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
      owner_id: '123456',
      latitude: -12.521017,
      longitude: -40.391894,
    })

    await updateContactHouseUseCase.execute({
      userId: '123456',
      contacts: { cellphone: 'Test' },
      houseId: id,
    })

    const { contact } = await updateContactHouseUseCase.execute({
      userId: '123456',
      contacts: { cellphone: 'aldovani@gmail.com' },
      houseId: id,
    })

    expect(contact).toEqual(
      expect.objectContaining({
        house_id: contact.house_id,
        cellphone: contact.cellphone,
      }),
    )
  })

  it('Should not be able to update  contact without a house existent', async () => {
    await expect(
      updateContactHouseUseCase.execute({
        userId: '123456',
        contacts: { cellphone: 'aldovani@gmail.com' },
        houseId: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to update  contact other user', async () => {
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
      updateContactHouseUseCase.execute({
        userId: '123',
        houseId: id,
        contacts: { cellphone: 'aldovani@gmail.com' },
      }),
    ).rejects.toBeInstanceOf(PermissionError)
  })
})
