import { inject, injectable } from 'tsyringe'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'
import { Appointment } from '@prisma/client'

interface FindAllByUserAppointmentUseCaseRequest {
  userId: string
}
interface FindAllByUserAppointmentUseCaseResponse {
  appointments: Appointment[]
}

@injectable()
export class FindAllByUserAppointmentUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({
    userId,
  }: FindAllByUserAppointmentUseCaseRequest): Promise<FindAllByUserAppointmentUseCaseResponse> {
    const appointments = await this.appointmentsRepository.findManyByUserId(
      userId,
    )
    return {
      appointments,
    }
  }
}
