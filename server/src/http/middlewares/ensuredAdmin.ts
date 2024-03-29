import { FastifyReply, FastifyRequest } from 'fastify'

export function ensuredAdmin(role: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest, rep: FastifyReply) => {
    const { role } = req.user

    if (role !== 'ADMIN') {
      return rep.status(403).send({ message: 'permission invalid' })
    }
  }
}
