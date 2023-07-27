import { beforeEach, describe, expect, it } from 'vitest'
import { HousesRepositoryInMemory } from '../../repositories/inMemory/housesRepositoryInMemory'
import { HouseRoomsRepositoryInMemory } from '../../repositories/inMemory/houseRoomsRepositoryInMemory'
import { UpdateRoomHouseUseCase } from './updateRoom'
import { RoomsRepositoryInMemory } from '../../repositories/inMemory/roomsRepositoryInMemory'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../shared/errors/PermissionError'

let housesRepository: HousesRepositoryInMemory
let houseRoomsRepository: HouseRoomsRepositoryInMemory
let roomsRepository: RoomsRepositoryInMemory
let updateRoomHouseUseCase: UpdateRoomHouseUseCase

describe('Update house room use case', () => {
  beforeEach(() => {
    housesRepository = new HousesRepositoryInMemory()
    houseRoomsRepository = new HouseRoomsRepositoryInMemory()
    roomsRepository = new RoomsRepositoryInMemory()
    updateRoomHouseUseCase = new UpdateRoomHouseUseCase(
      housesRepository,
      roomsRepository,
      houseRoomsRepository,
    )
  })

  it('Should be able to create a room for a house', async () => {
    const { id } = await housesRepository.create({
      buy_price: 10000,
      rent_price: 500,
      description: 'House test',
      title: 'title test',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      state: 'São paulo',
      owner_id: '123456',
      latitude: -12.521017,
      longitude: -40.391894,
    })

    const { id: roomId } = await roomsRepository.create({
      name: 'Tv room',
    })

    const { houseRoom } = await updateRoomHouseUseCase.execute({
      userId: '123456',
      houseId: id,
      rooms: [
        {
          quantity: 1,
          room_id: roomId,
        },
      ],
    })

    expect(houseRoom.length).toBe(1)

    expect(houseRoom).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          house_id: id,
          room_id: roomId,
          quantity: 1,
        }),
      ]),
    )
  })

  it('Should be able to update a room for a house', async () => {
    const { id } = await housesRepository.create({
      buy_price: 10000,
      rent_price: 500,
      description: 'House test',
      title: 'title test',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      state: 'São paulo',
      owner_id: '123456',
      latitude: -12.521017,
      longitude: -40.391894,
    })

    const { id: roomId } = await roomsRepository.create({
      name: 'Tv room',
    })

    await updateRoomHouseUseCase.execute({
      userId: '123456',
      houseId: id,
      rooms: [
        {
          quantity: 1,
          room_id: roomId,
        },
      ],
    })
    const { houseRoom } = await updateRoomHouseUseCase.execute({
      userId: '123456',
      houseId: id,
      rooms: [
        {
          quantity: 2,
          room_id: roomId,
        },
      ],
    })

    expect(houseRoom.length).toBe(1)

    expect(houseRoom).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          house_id: id,
          room_id: roomId,
          quantity: 2,
        }),
      ]),
    )
  })

  it('Should be able to create two rooms for a house', async () => {
    const { id } = await housesRepository.create({
      buy_price: 10000,
      rent_price: 500,
      description: 'House test',
      title: 'title test',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      state: 'São paulo',
      owner_id: '123456',
      latitude: -12.521017,
      longitude: -40.391894,
    })

    const { id: tvRoomId } = await roomsRepository.create({
      name: 'Tv room',
    })
    const { id: classId } = await roomsRepository.create({
      name: 'class',
    })

    const { houseRoom } = await updateRoomHouseUseCase.execute({
      userId: '123456',
      houseId: id,
      rooms: [
        {
          quantity: 2,
          room_id: classId,
        },
        {
          quantity: 1,
          room_id: tvRoomId,
        },
      ],
    })

    expect(houseRoom.length).toBe(2)

    expect(houseRoom).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          house_id: id,
          room_id: tvRoomId,
          quantity: 1,
        }),
        expect.objectContaining({
          house_id: id,
          room_id: classId,
          quantity: 2,
        }),
      ]),
    )
  })

  it('Should be able to delete room for a house', async () => {
    const { id } = await housesRepository.create({
      buy_price: 10000,
      rent_price: 500,
      description: 'House test',
      title: 'title test',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      state: 'São paulo',
      owner_id: '123456',
      latitude: -12.521017,
      longitude: -40.391894,
    })

    const { id: roomId } = await roomsRepository.create({
      name: 'Tv room',
    })

    await updateRoomHouseUseCase.execute({
      userId: '123456',
      houseId: id,
      rooms: [
        {
          quantity: 1,
          room_id: roomId,
        },
      ],
    })
    const { houseRoom } = await updateRoomHouseUseCase.execute({
      userId: '123456',
      houseId: id,
      rooms: [
        {
          quantity: 0,
          room_id: roomId,
        },
      ],
    })

    expect(houseRoom.length).toBe(0)
  })

  it('Should not be able to update  contact without a house existent', async () => {
    await expect(
      updateRoomHouseUseCase.execute({
        userId: '123456',
        rooms: [{ room_id: '123456', quantity: 1 }],
        houseId: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to update  room other user', async () => {
    const { id } = await housesRepository.create({
      buy_price: 10000,
      rent_price: 500,
      description: 'House test',
      title: 'title test',
      address: 'Street test',
      address_number: 158,
      city: 'Dobrada',
      district: 'Portal do sol',
      state: 'São paulo',
      owner_id: '1235456',
      latitude: -12.521017,
      longitude: -40.391894,
    })
    await expect(
      updateRoomHouseUseCase.execute({
        userId: '123',
        rooms: [{ room_id: '123456', quantity: 1 }],
        houseId: id,
      }),
    ).rejects.toBeInstanceOf(PermissionError)
  })
})
