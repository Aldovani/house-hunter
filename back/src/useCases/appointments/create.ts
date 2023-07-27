import { inject, injectable } from 'tsyringe'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { Appointment } from '@prisma/client'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import dayjs from 'dayjs'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'
import { PermissionError } from '../../shared/errors/PermissionError'
import { InvalidaDateError } from '../../shared/errors/InvalidaDateError'

interface CreateAppointmentUseCaseRequest {
  houseId: string
  userId: string
  appointmentDate: Date
}
interface CreateAppointmentUseCaseResponse {
  appointment: Appointment
}

@injectable()
export class CreateAppointmentUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({
    appointmentDate,
    houseId,
    userId,
  }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
    const isAppointmentDataBeforeDateNow = dayjs(
      appointmentDate.toISOString(),
    ).isBefore(new Date().toISOString())

    if (isAppointmentDataBeforeDateNow) {
      throw new InvalidaDateError()
    }

    const houseExists = await this.housesRepository.findById(houseId)

    if (!houseExists) {
      throw new ResourceNotFoundError()
    }

    const isOwner = houseExists.owner_id === userId

    if (isOwner) {
      throw new PermissionError()
    }

    const lastAppointmentByHouseId =
      await this.appointmentsRepository.findLastAppointmentByHouseId(houseId)

    if (lastAppointmentByHouseId) {
      const hour = dayjs(appointmentDate).diff(
        lastAppointmentByHouseId.appointment_date,
        'hour',
      )

      if (hour < 1) {
        throw new ResourceAlreadyExistError()
      }
    }

    const lastAppointmentByUserId =
      await this.appointmentsRepository.findLastAppointmentByUserId(userId)

    if (lastAppointmentByUserId) {
      const differenceInHours = dayjs(appointmentDate).diff(
        lastAppointmentByUserId.appointment_date,
        'hour',
      )
      if (differenceInHours < 3) {
        throw new Error()
      }
    }

    const appointment = await this.appointmentsRepository.create(
      userId,
      houseId,
      appointmentDate,
    )

    return {
      appointment,
    }
  }
}
