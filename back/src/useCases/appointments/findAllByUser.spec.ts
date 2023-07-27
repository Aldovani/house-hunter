import { beforeEach, describe, expect, it } from 'vitest'
import { AppointmentsRepositoryInMemory } from '../../repositories/inMemory/appointmentsRepositoryInMemory'
import { FindAllByUserAppointmentUseCase } from './findAllByUser'

let appointmentsRepository: AppointmentsRepositoryInMemory
let findAllByUserAppointmentUseCase: FindAllByUserAppointmentUseCase

describe('Change status appointment use Case', () => {
  beforeEach(async () => {
    appointmentsRepository = new AppointmentsRepositoryInMemory()
    findAllByUserAppointmentUseCase = new FindAllByUserAppointmentUseCase(
      appointmentsRepository,
    )
  })

  it('Should be able to get all appointment from an user ', async () => {
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

    const { appointments } = await findAllByUserAppointmentUseCase.execute({
      userId: 'user-Id',
    })

    expect(appointments.length).toBe(2)
  })
})
