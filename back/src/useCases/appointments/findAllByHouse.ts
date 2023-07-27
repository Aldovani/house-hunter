import { inject, injectable } from 'tsyringe'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'
import { Appointment } from '@prisma/client'
import dayjs from 'dayjs'

interface FindAllByHouseAppointmentUseCaseRequest {
  houseId: string
  date?: Date
}
interface FindAllByHouseAppointmentUseCaseResponse {
  appointments: Appointment[]
}

@injectable()
export class FindAllByHouseAppointmentUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({
    houseId,
    date,
  }: FindAllByHouseAppointmentUseCaseRequest): Promise<FindAllByHouseAppointmentUseCaseResponse> {
    let startDate
    let endDate

    if (date) {
      startDate = new Date(date.toISOString().split('T')[0].toString())

      endDate = dayjs(startDate).add(1, 'd').toDate()
    }
    const appointments = await this.appointmentsRepository.findManyByHouseId(
      houseId,
      startDate,
      endDate,
    )
    return {
      appointments,
    }
  }
}
