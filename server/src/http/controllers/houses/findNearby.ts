import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { FindNearbyHousesUseCase } from '../../../useCases/houses/findNearby'

export class FindNearbyHouseController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const findNearbyHouseQuerySchema = z.object({
      latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
      distance: z.coerce.number().default(10),
    })

    const { distance, latitude, longitude } = findNearbyHouseQuerySchema.parse(
      req.query,
    )

    const findNearbyHousesUseCase = container.resolve(FindNearbyHousesUseCase)

    const { houses } = await findNearbyHousesUseCase.execute({
      distance,
      latitude,
      longitude,
    })

    rep.status(200).send({ houses })
  }
}
