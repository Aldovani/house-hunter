import { Appointment } from '@prisma/client'

export interface IAppointmentsRepository {
  create(
    userId: string,
    houseId: string,
    appointmentDate: Date,
  ): Promise<Appointment>
  updateStatusById(id: string, status: 'ACCEPTED' | 'CANCELED'): Promise<void>
  findById(id: string): Promise<Appointment | null>
  findLastAppointmentByUserId(userId: string): Promise<Appointment | null>
  findLastAppointmentByHouseId(houseId: string): Promise<Appointment | null>
  findManyByHouseId(
    houseId: string,
    startDate?: Date | undefined,
    endDate?: Date | undefined,
  ): Promise<Appointment[]>
  findManyByUserId(userId: string): Promise<Appointment[]>
}
