import { beforeEach, describe, expect, it } from 'vitest'
import { AppointmentsRepositoryInMemory } from '../../repositories/inMemory/appointmentsRepositoryInMemory'
import { FindAllByHouseAppointmentUseCase } from './findAllByHouse'

let appointmentsRepository: AppointmentsRepositoryInMemory
let findAllByHouseAppointmentUseCase: FindAllByHouseAppointmentUseCase

describe('Change status appointment use Case', () => {
  beforeEach(async () => {
    appointmentsRepository = new AppointmentsRepositoryInMemory()
    findAllByHouseAppointmentUseCase = new FindAllByHouseAppointmentUseCase(
      appointmentsRepository,
    )
  })

  it('Should be able to get all appointment from a house', async () => {
    await appointmentsRepository.create(
      'user-Id',
      'house test',
      new Date('2023-09-10'),
    )
    await appointmentsRepository.create(
      'user-Id',
      'house test',
      new Date('2023-10-10'),
    )

    const { appointments } = await findAllByHouseAppointmentUseCase.execute({
      houseId: 'house test',
    })

    expect(appointments.length).toBe(2)
  })

  it('Should be able to get all appointment from a date', async () => {
    await appointmentsRepository.create(
      'user-Id',
      'house test',
      new Date('2023-09-10'),
    )
    await appointmentsRepository.create(
      'user-Id',
      'house test',
      new Date('2023-10-10'),
    )
    const { appointments } = await findAllByHouseAppointmentUseCase.execute({
      houseId: 'house test',
      date: new Date('2023-09-10'),
    })

    expect(appointments.length).toBe(1)
  })
})
