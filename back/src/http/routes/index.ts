import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.router'
import { roomsRoutes } from './rooms.router'
import { categoriesRoutes } from './categories.router'
import { housesRoutes } from './houses.router'
import { appointmentsRoutes } from './appointments.router'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(categoriesRoutes)
  app.register(roomsRoutes)
  app.register(housesRoutes)
  app.register(appointmentsRoutes)
}
