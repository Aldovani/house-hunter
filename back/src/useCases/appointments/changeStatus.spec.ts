import { beforeEach, describe, expect, it } from 'vitest'
import { AppointmentsRepositoryInMemory } from '../../repositories/inMemory/appointmentsRepositoryInMemory'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { ChangeStatusAppointmentUseCase } from './changeStatus'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'

let appointmentsRepository: AppointmentsRepositoryInMemory
let housesRepository: HousesRepositoryInMemory
let changeStatusAppointmentUseCase: ChangeStatusAppointmentUseCase

describe('Change status appointment use Case', () => {
  beforeEach(async () => {
    appointmentsRepository = new AppointmentsRepositoryInMemory()
    housesRepository = new HousesRepositoryInMemory()
    changeStatusAppointmentUseCase = new ChangeStatusAppointmentUseCase(
      appointmentsRepository,
      housesRepository,
    )

    await housesRepository.create({
      title: 'test',
      description: 'test',
      owner_id: 'owner-id',
      buy_price: 1000,
      rent_price: 500,
      id: 'house-id',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      latitude: 15.8,
      longitude: 8.7,
      state: 'São paulo',
    })
  })

  it('Should  be able to change status', async () => {
    const { id } = await appointmentsRepository.create(
      'user id test',
      'house-id',
      new Date(),
    )

    const { appointment } = await changeStatusAppointmentUseCase.execute({
      appointmentId: id,
      status: 'CANCELED',
      userId: 'user id test',
    })

    expect(appointment).toEqual(
      expect.objectContaining({
        id,
      }),
    )
  })

  it('Should not be able to change status with house existent', async () => {
    await expect(
      changeStatusAppointmentUseCase.execute({
        appointmentId: 'test',
        status: 'CANCELED',
        userId: '1235',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
