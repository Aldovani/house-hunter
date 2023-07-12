import { container } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { PrismaUsersRepository } from '../../repositories/prisma/prismaUsersRepository'

import '../provider'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'
import { PrismaUserTokensRepository } from '../../repositories/prisma/prismaUserTokensRepository'
import { IRoomsRepository } from '../../repositories/IRoomsRepository'
import { PrismaRoomsRepository } from '../../repositories/prisma/prismaRoomsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  PrismaUserTokensRepository,
)

container.registerSingleton<IRoomsRepository>(
  'RoomsRepository',
  PrismaRoomsRepository,
)
