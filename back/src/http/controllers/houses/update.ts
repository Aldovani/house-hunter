import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { UpdateHouseUseCase } from '../../../useCases/houses/update'

export class UpdateHouseController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateHouseParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const updateHouseBodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      address: z.string().optional(),
      addressNumber: z.number().optional(),
      district: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      buyPrice: z.number().positive().min(1).optional(),
      rentPrice: z.number().positive().min(1).optional(),
      latitude: z
        .number()
        .optional()
        .refine((value) => {
          return value ? Math.abs(value) <= 90 : undefined
        }),
      longitude: z
        .number()
        .optional()
        .refine((value) => {
          return value ? Math.abs(value) <= 180 : undefined
        }),
    })

    const { sub } = req.user

    const houseParsed = updateHouseBodySchema.parse(req.body)
    const { id } = updateHouseParamsSchema.parse(req.body)

    const updateHouseUseCase = container.resolve(UpdateHouseUseCase)

    const data = {
      ...houseParsed,
      rent_price: houseParsed.rentPrice,
      buy_price: houseParsed.buyPrice,
      address_number: houseParsed.addressNumber,
    }

    await updateHouseUseCase.execute({
      houseId: id,
      userId: sub,
      houseData: data,
    })

    rep.status(204).send()
  }
}
