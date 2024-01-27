import { inject, injectable } from 'tsyringe'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'
import { Appointment } from '@prisma/client'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { PermissionError } from '../../shared/errors/PermissionError'

interface ChangeStatusAppointmentUseCaseRequest {
  appointmentId: string
  status: 'ACCEPTED' | 'CANCELED'
  userId: string
}
interface ChangeStatusAppointmentUseCaseResponse {
  appointment: Appointment
}

@injectable()
export class ChangeStatusAppointmentUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('HousesRepository')
    private HousesRepository: IHousesRepository,
  ) { }

  async execute({
    appointmentId,
    status,
    userId,
  }: ChangeStatusAppointmentUseCaseRequest): Promise<ChangeStatusAppointmentUseCaseResponse> {
    const appointmentExists = await this.appointmentsRepository.findById(
      appointmentId,
    )

    if (!appointmentExists) {
      throw new ResourceNotFoundError()
    }

    const house = await this.HousesRepository.findById(
      appointmentExists.house_id,
    )

    const isOwner = house!.owner_id === userId

    const isUserValid = appointmentExists.user_id === userId || isOwner

    if (!isUserValid) {
      throw new Error()
    }

    if (!isOwner && status === 'ACCEPTED') {
      throw new PermissionError()
    }

    await this.appointmentsRepository.updateStatusById(appointmentId, status)

    appointmentExists.status = status

    return {
      appointment: appointmentExists,
    }
  }
}
