import { FastifyInstance } from 'fastify'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { CreateHouseController } from '../controllers/houses/create'
import { UpdateHouseController } from '../controllers/houses/update'
import { UpdateContactController } from '../controllers/houses/updateContact'
import { UpdateRoomController } from '../controllers/rooms/update'
import { GetHouseController } from '../controllers/houses/get'
import { UpdateGalleryController } from '../controllers/houses/gallery'
import { upload } from '../../config/upload'
import { FindNearbyHouseController } from '../controllers/houses/findNearby'
import { FindAllByUserHouseController } from '../controllers/houses/findAllByUser'
import { UpdateAvailableHouseController } from '../controllers/houses/updateAvailable'

const createHouseController = new CreateHouseController()
const updateHouseController = new UpdateHouseController()
const updateContactController = new UpdateContactController()
const updateRoomController = new UpdateRoomController()
const getHouseController = new GetHouseController()
const updateGalleryController = new UpdateGalleryController()
const findNearbyHouseController = new FindNearbyHouseController()
const findAllByUserHouseController = new FindAllByUserHouseController()
const updateAvailableHouseController = new UpdateAvailableHouseController()

export async function housesRoutes(app: FastifyInstance) {
  app.post(
    '/houses',
    { onRequest: [ensuredAuth] },
    createHouseController.handle,
  )
  app.get('/houses/:id', getHouseController.handle)

  app.get('/houses/nearby', findNearbyHouseController.handle)
  app.get(
    '/houses',
    {
      onRequest: [ensuredAuth],
    },
    findAllByUserHouseController.handle,
  )

  app.put(
    '/houses/:id',
    { onRequest: [ensuredAuth] },
    updateHouseController.handle,
  )

  app.put(
    '/houses/:id/contacts',
    { onRequest: [ensuredAuth] },
    updateContactController.handle,
  )
  app.put(
    '/houses/:id/rooms',
    { onRequest: [ensuredAuth] },
    updateRoomController.handle,
  )

  app.put(
    '/houses/:id/gallies',
    { onRequest: [ensuredAuth, upload.array('gallery', 5)] },
    updateGalleryController.handle,
  )

  app.patch(
    '/houses/:id/available',
    { onRequest: [ensuredAuth] },
    updateAvailableHouseController.handle,
  )
}
