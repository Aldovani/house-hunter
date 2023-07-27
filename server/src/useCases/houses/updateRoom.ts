import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { IRoomsRepository } from '../../repositories/IRoomsRepository'
import { IHouseRoomsRepository } from '../../repositories/IHouseRoomsRepository'
import { HouseRoom } from '@prisma/client'
import { PermissionError } from '../../shared/errors/PermissionError'

export interface RoomsRequest {
  room_id: string
  quantity: number
}

interface UpdateContactHouseUseCaseRequest {
  rooms: RoomsRequest[]
  houseId: string
  userId: string
}
interface UpdateContactHouseUseCaseResponse {
  houseRoom: HouseRoom[]
}

@injectable()
export class UpdateRoomHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
    @inject('HouseRoomsRepository')
    private houseRoomsRepository: IHouseRoomsRepository,
  ) {}

  async execute({
    rooms,
    houseId,
    userId,
  }: UpdateContactHouseUseCaseRequest): Promise<UpdateContactHouseUseCaseResponse> {
    const houseExists = await this.housesRepository.findById(houseId)

    if (!houseExists) {
      throw new ResourceNotFoundError()
    }

    const isOwnerIdEqualUserId = userId === houseExists.owner_id

    if (!isOwnerIdEqualUserId) {
      throw new PermissionError()
    }
    const roomsFromDB = await this.roomsRepository.getAllRooms()

    const onlyIdOfRooms = roomsFromDB.map((room) => room.id)

    const filteredRooms = rooms.filter(
      (room) => onlyIdOfRooms.includes(room.room_id) && rooms,
    )

    const newRooms: HouseRoom[] = []

    for await (const item of filteredRooms) {
      if (item.quantity <= 0) {
        await this.houseRoomsRepository.removeByHouseIdAndRoomId(
          houseId,
          item.room_id,
        )
      } else {
        const updatedRoom = await this.houseRoomsRepository.updateOrCreate({
          ...item,
          house_id: houseId,
        })
        newRooms.push(updatedRoom)
      }
    }

    return {
      houseRoom: newRooms,
    }
  }
}
