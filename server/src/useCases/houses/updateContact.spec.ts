import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { UpdateContactHouseUseCase } from './updateContact'
import { ContactsRepositoryInMemory } from '../../repositories/inMemory/contactsRepositoryInMemory'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { CategoriesRepositoryInMemory } from '../../repositories/inMemory/categoriesRepositoryInMemory'
import { PermissionError } from '../../shared/errors/PermissionError'

let contactsRepository: ContactsRepositoryInMemory
let categoriesRepository: CategoriesRepositoryInMemory
let housesRepository: HousesRepositoryInMemory
let updateContactHouseUseCase: UpdateContactHouseUseCase

describe('Update house contact use case', () => {
  beforeEach(() => {
    contactsRepository = new ContactsRepositoryInMemory()
    housesRepository = new HousesRepositoryInMemory()
    categoriesRepository = new CategoriesRepositoryInMemory()
    updateContactHouseUseCase = new UpdateContactHouseUseCase(
      housesRepository,
      contactsRepository,
      categoriesRepository,
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

    const { id: categoryId } = await categoriesRepository.create('email')

    const { contact } = await updateContactHouseUseCase.execute({
      userId: '123456',
      contacts: [{ categoryId, value: 'Test' }],
      houseId: id,
    })

    expect(contact).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category_id: categoryId,
          house_id: id,
          value: 'Test',
          id: expect.any(String),
        }),
      ]),
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

    const { id: categoryId } = await categoriesRepository.create('email')

    const { contact: createContact } = await updateContactHouseUseCase.execute({
      userId: '123456',
      contacts: [{ categoryId, value: 'Test' }],
      houseId: id,
    })

    const { contact } = await updateContactHouseUseCase.execute({
      userId: '123456',
      contacts: [{ categoryId, value: 'aldovani@gmail.com' }],
      houseId: id,
    })

    expect(contact).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          house_id: createContact[0].house_id,
          category_id: createContact[0].category_id,
          value: 'aldovani@gmail.com',
        }),
      ]),
    )
  })

  it('should be able to delete a contact for  a house existent', async () => {
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

    const { id: categoryId } = await categoriesRepository.create('email')

    await updateContactHouseUseCase.execute({
      userId: '123456',
      contacts: [{ categoryId, value: 'Test' }],
      houseId: id,
    })

    const { contact } = await updateContactHouseUseCase.execute({
      userId: '123456',
      contacts: [{ categoryId, value: '' }],
      houseId: id,
    })

    expect(contact.length).toBe(0)
  })

  it('Should not be able to update  contact without a house existent', async () => {
    await expect(
      updateContactHouseUseCase.execute({
        userId: '123456',
        contacts: [{ categoryId: '123456', value: 'Test' }],
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
        contacts: [{ categoryId: '13', value: 'teste' }],
        houseId: id,
      }),
    ).rejects.toBeInstanceOf(PermissionError)
  })
})
