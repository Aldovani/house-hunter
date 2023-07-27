import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { FindAllByUserHouseUseCase } from '../../../useCases/houses/findAllByUser'

export class FindAllByUserHouseController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { sub } = req.user

    const findAllByUserHouseUseCase = container.resolve(
      FindAllByUserHouseUseCase,
    )

    const { houses } = await findAllByUserHouseUseCase.execute({
      userId: sub,
    })

    rep.status(200).send({ houses })
  }
}
