import { FastifyInstance } from 'fastify'
import { userRoutes } from './users.router'

export async function routes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: 'users' })
}
