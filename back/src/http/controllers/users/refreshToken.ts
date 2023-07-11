import { FastifyReply, FastifyRequest } from 'fastify'

export class RefreshTokenController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    try {
      await req.refreshJwtVerify({ onlyCookie: true })

      const { sub } = req.user

      const token = await rep.accessJwtSign({}, { sign: { sub } })

      const refreshToken = await rep.refreshJwtSign(
        {},
        { sign: { sub, expiresIn: '15d' } },
      )

      return rep
        .status(200)
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: true,
        })
        .send({
          token,
        })
    } catch (err) {
      return rep
        .status(401)
        .send({ message: 'refresh token on cookie is required' })
    }
  }
}
