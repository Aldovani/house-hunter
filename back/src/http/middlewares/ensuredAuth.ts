import { FastifyReply, FastifyRequest } from 'fastify'

export async function ensuredAuth(req: FastifyRequest, rep: FastifyReply) {
  try {
    await req.accessJwtVerify({})
  } catch (err) {
    return rep.status(401).send({ message: 'unauthorized', error: err })
  }
}
