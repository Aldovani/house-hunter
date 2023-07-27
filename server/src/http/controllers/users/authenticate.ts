import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AuthenticateUseCase } from '../../../useCases/users/authenticate'
import { InvalidCredencialError } from '../../../shared/errors/InvalidCredencialError'

export class AuthenticateController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(req.body)

    const authenticateUseCase = container.resolve(AuthenticateUseCase)

    try {
      const { user } = await authenticateUseCase.execute({ email, password })

      const token = await rep.accessJwtSign(
        { role: user.role },
        { sign: { sub: user.id } },
      )

      const refreshToken = await rep.refreshJwtSign(
        { role: user.role },
        { sign: { sub: user.id, expiresIn: '15d' } },
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
      if (err instanceof InvalidCredencialError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}
