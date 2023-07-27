import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateAppointmentUseCase } from './create'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { AppointmentsRepositoryInMemory } from '../../repositories/inMemory/appointmentsRepositoryInMemory'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'
import { InvalidaDateError } from '../../shared/errors/InvalidaDateError'

let appointmentsRepository: AppointmentsRepositoryInMemory
let housesRepository: HousesRepositoryInMemory
let createAppointmentUseCase: CreateAppointmentUseCase

describe('Create appointment use Case', () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepositoryInMemory()
    housesRepository = new HousesRepositoryInMemory()
    createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentsRepository,
      housesRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to create a new appointment', async () => {
    const { id } = await housesRepository.create({
      description: 'test',
      title: 'test',
      buy_price: 100,
      rent_price: 500,
      owner_id: '12315',
      id: 'house-id',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
    })

    const { appointment } = await createAppointmentUseCase.execute({
      userId: 'userId test',
      houseId: id,
      appointmentDate: new Date(),
    })

    expect(appointment).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        created_at: expect.any(Date),
        user_id: 'userId test',
        house_id: id,
        appointment_date: expect.any(Date),
      }),
    )
  })

  it('Should be able to create two appointment in different houses ', async () => {
    const house1 = await housesRepository.create({
      description: 'test',
      title: 'test',
      buy_price: 100,
      rent_price: 500,
      owner_id: '12315',
      id: 'house-id',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
    })
    const house2 = await housesRepository.create({
      description: 'test',
      title: 'test',
      buy_price: 100,
      rent_price: 500,
      id: 'house-id',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
      owner_id: '781',
    })
    vi.setSystemTime(new Date(2023, 5, 6, 12))

    const { appointment: appointmentHouse1 } =
      await createAppointmentUseCase.execute({
        userId: 'userId test',
        houseId: house1.id,
        appointmentDate: new Date(),
      })
    vi.setSystemTime(new Date(2023, 5, 6, 18))

    const { appointment: appointmentHouse2 } =
      await createAppointmentUseCase.execute({
        userId: 'userId test',
        houseId: house2.id,
        appointmentDate: new Date(),
      })

    expect(appointmentHouse1).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        created_at: expect.any(Date),
        user_id: 'userId test',
        house_id: house1.id,
        appointment_date: expect.any(Date),
      }),
    )

    expect(appointmentHouse2).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        created_at: expect.any(Date),
        user_id: 'userId test',
        house_id: house2.id,
        appointment_date: expect.any(Date),
      }),
    )
  })

  it('Should not be able to create a new appointment within a three-hour interval', async () => {
    const { id } = await housesRepository.create({
      description: 'test',
      title: 'test',
      buy_price: 100,
      rent_price: 500,
      owner_id: '12315',
      id: 'house-id',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
    })

    await createAppointmentUseCase.execute({
      userId: 'userId test',
      houseId: id,
      appointmentDate: new Date(),
    })

    await expect(
      createAppointmentUseCase.execute({
        userId: 'userId test',
        houseId: id,
        appointmentDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should not be able to create a new appointment with a appointment existent same hour ', async () => {
    const { id } = await housesRepository.create({
      description: 'test',
      title: 'test',
      buy_price: 100,
      rent_price: 500,
      owner_id: '12315',
      id: 'house-id',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
    })

    await createAppointmentUseCase.execute({
      userId: 'userId test',
      houseId: id,
      appointmentDate: new Date(),
    })

    await expect(
      createAppointmentUseCase.execute({
        userId: 'userId test',
        houseId: id,
        appointmentDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistError)
  })

  it('Should be be able to create a new appointment after three-hour', async () => {
    vi.setSystemTime(new Date(2023, 5, 6, 12))
    const { id } = await housesRepository.create({
      description: 'test',
      title: 'test',
      buy_price: 100,
      rent_price: 500,
      owner_id: '12315',
      id: 'house-id',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
    })

    await createAppointmentUseCase.execute({
      userId: 'userId test',
      houseId: id,
      appointmentDate: new Date(),
    })

    vi.setSystemTime(new Date(2023, 5, 6, 18))

    const { appointment } = await createAppointmentUseCase.execute({
      userId: 'userId test',
      houseId: id,
      appointmentDate: new Date(),
    })

    expect(appointment).toEqual(
      expect.objectContaining({
        user_id: 'userId test',
        house_id: id,
        appointment_date: new Date(),
      }),
    )
  })

  it('Should not be able to create a appointment with house existent', async () => {
    await expect(
      createAppointmentUseCase.execute({
        userId: 'userId test',
        houseId: 'test',
        appointmentDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to create a appointment with a wrong data', async () => {
    await expect(
      createAppointmentUseCase.execute({
        userId: 'userId test',
        houseId: 'test',
        appointmentDate: new Date('2023-06-23'),
      }),
    ).rejects.toBeInstanceOf(InvalidaDateError)
  })
})
