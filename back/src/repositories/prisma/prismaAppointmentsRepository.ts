import { Appointment } from '@prisma/client'
import { prisma } from '../../libs/prisma'
import { IAppointmentsRepository } from '../IAppointmentsRepository'

export class prismaAppointmentsRepository implements IAppointmentsRepository {
  async create(
    userId: string,
    houseId: string,
    appointmentDate: Date,
  ): Promise<Appointment> {
    const appointment = await prisma.appointment.create({
      data: {
        appointment_date: appointmentDate,
        house_id: houseId,
        user_id: userId,
      },
    })

    return appointment
  }

  async updateStatusById(
    id: string,
    status: 'ACCEPTED' | 'CANCELED',
  ): Promise<void> {
    await prisma.appointment.update({
      data: {
        status,
      },
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    })

    return appointment
  }

  async findLastAppointmentByUserId(
    userId: string,
  ): Promise<Appointment | null> {
    const lastAppointment = await prisma.appointment.findFirst({
      where: {
        user_id: userId,
        status: {
          notIn: 'CANCELED',
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return lastAppointment
  }

  async findLastAppointmentByHouseId(
    houseId: string,
  ): Promise<Appointment | null> {
    const lastAppointment = await prisma.appointment.findFirst({
      where: {
        house_id: houseId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return lastAppointment
  }

  async findManyByHouseId(
    houseId: string,
    startDate?: Date | undefined,
    endDate?: Date | undefined,
  ): Promise<Appointment[]> {
    const appointments = await prisma.appointment.findMany({
      where: {
        house_id: houseId,
        appointment_date: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          notIn: 'CANCELED',
        },
      },
    })
    return appointments
  }

  async findManyByUserId(userId: string): Promise<Appointment[]> {
    const appointments = await prisma.appointment.findMany({
      where: {
        user_id: userId,
      },
    })
    return appointments
  }
}
