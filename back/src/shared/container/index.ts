import { container } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { PrismaUsersRepository } from '../../repositories/prisma/prismaUsersRepository'

import '../provider'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'
import { PrismaUserTokensRepository } from '../../repositories/prisma/prismaUserTokensRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  PrismaUserTokensRepository,
)
