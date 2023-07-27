import { FastifyInstance } from 'fastify'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { CreateAppointmentController } from '../controllers/appointment/create'
import { ChangeStatusAppointmentController } from '../controllers/appointment/changeStatus'
import { FindAllByHouseAppointmentController } from '../controllers/appointment/findAllByHouse'
import { FindAllByUserAppointmentController } from '../controllers/appointment/findAllByUser'

const createAppointmentController = new CreateAppointmentController()
const changeStatusAppointmentController =
  new ChangeStatusAppointmentController()
const findAllByHouseAppointmentController =
  new FindAllByHouseAppointmentController()

const findAllByUserAppointmentController =
  new FindAllByUserAppointmentController()

export async function appointmentsRoutes(app: FastifyInstance) {
  app.post(
    '/appointments',
    { onRequest: [ensuredAuth] },
    createAppointmentController.handle,
  )

  app.patch(
    '/appointments/:id',
    { onRequest: [ensuredAuth] },
    changeStatusAppointmentController.handle,
  )
  app.get('/appointments/house/:id', findAllByHouseAppointmentController.handle)
  app.get(
    '/appointments/user',
    { onRequest: [ensuredAuth] },
    findAllByUserAppointmentController.handle,
  )
}
