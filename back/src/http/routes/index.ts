import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.router'
import { roomsRoutes } from './rooms.router'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(roomsRoutes)
}
