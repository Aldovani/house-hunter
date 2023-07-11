import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.router'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: 'users' })
}
