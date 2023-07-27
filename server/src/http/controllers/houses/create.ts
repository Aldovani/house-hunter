import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { CreateHouseUseCase } from '../../../useCases/houses/create'

export class CreateHouseController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const createHouseBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      buyPrice: z.number().positive().min(1),
      rentPrice: z.number().positive().min(1),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
      city: z.string(),
      address: z.string(),
      addressNumber: z.number(),
      state: z.string(),
      district: z.string(),
    })

    const { sub } = req.user

    const {
      buyPrice,
      description,
      rentPrice,
      title,
      address,
      addressNumber,
      city,
      district,
      latitude,
      longitude,
      state,
    } = createHouseBodySchema.parse(req.body)

    const createHouseUseCase = container.resolve(CreateHouseUseCase)

    const { house } = await createHouseUseCase.execute({
      data: {
        buyPrice,
        description,
        rentPrice,
        title,
        address,
        addressNumber,
        city,
        district,
        latitude,
        longitude,
        state,
      },
      userId: sub,
    })

    rep.status(201).send({ house })
  }
}
