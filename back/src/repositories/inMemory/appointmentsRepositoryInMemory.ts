import { Appointment, STATUS } from '@prisma/client'
import { IAppointmentsRepository } from '../IAppointmentsRepository'
import { randomUUID } from 'crypto'

export class AppointmentsRepositoryInMemory implements IAppointmentsRepository {
  private appointments: Appointment[] = []
  async create(
    userId: string,
    houseId: string,
    appointmentDate: Date,
  ): Promise<Appointment> {
    const appointment = {
      created_at: new Date(),
      house_id: houseId,
      user_id: userId,
      status: 'PENDING' as STATUS,
      id: randomUUID(),
      appointment_date: appointmentDate,
    }
    this.appointments.push(appointment)

    return appointment
  }

  async findLastAppointmentByUserId(
    userId: string,
  ): Promise<Appointment | null> {
    const appointments = this.appointments.filter(
      (appointment) => appointment.user_id === userId,
    )

    if (appointments.length === 0) {
      return null
    }

    const [lastAppointment] = appointments.sort(
      (a, b) => b.appointment_date.getTime() - a.appointment_date.getTime(),
    )

    return lastAppointment
  }

  async findLastAppointmentByHouseId(
    houseId: string,
  ): Promise<Appointment | null> {
    const appointments = this.appointments.filter(
      (appointment) => appointment.house_id === houseId,
    )

    if (appointments.length === 0) {
      return null
    }

    const [lastAppointment] = appointments.sort(
      (a, b) => b.appointment_date.getTime() - a.appointment_date.getTime(),
    )

    return lastAppointment
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.appointments.find(
      (appointment) => appointment.id === id,
    )

    if (!appointment) {
      return null
    }

    return appointment
  }

  async updateStatusById(
    id: string,
    status: 'ACCEPTED' | 'CANCELED',
  ): Promise<void> {
    this.appointments.forEach((appointment) => {
      if (appointment.id === id) {
        appointment.status = status
      }
    })
  }

  async findManyByHouseId(
    houseId: string,
    startDate: Date | undefined,
    endDate: Date | undefined,
  ): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) => appointment.house_id === houseId,
    )

    if (startDate && endDate) {
      const appointmentBySameDay = appointments.filter(
        ({ appointment_date }) =>
          appointment_date >= startDate && appointment_date < endDate,
      )
      return appointmentBySameDay
    }

    return appointments
  }

  async findManyByUserId(userId: string): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) => appointment.user_id === userId,
    )

    return appointments
  }
}
