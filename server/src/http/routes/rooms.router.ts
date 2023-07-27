import { FastifyInstance } from 'fastify'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { CreateRoomController } from '../controllers/rooms/create'
import { UpdateRoomController } from '../controllers/rooms/update'
import { DeleteRoomController } from '../controllers/rooms/delete'
import { GetAllRoomController } from '../controllers/rooms/getAll'

const createRoomController = new CreateRoomController()
const updateRoomController = new UpdateRoomController()
const deleteRoomController = new DeleteRoomController()
const getAllRoomController = new GetAllRoomController()

export async function roomsRoutes(app: FastifyInstance) {
  app.post('/rooms', { onRequest: [ensuredAuth] }, createRoomController.handle)
  app.put(
    '/rooms/:id',
    { onRequest: [ensuredAuth] },
    updateRoomController.handle,
  )
  app.delete(
    '/rooms/:id',
    { onRequest: [ensuredAuth] },
    deleteRoomController.handle,
  )
  app.get('/rooms', getAllRoomController.handle)
}
