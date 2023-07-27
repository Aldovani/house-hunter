import { container } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { PrismaUsersRepository } from '../../repositories/prisma/prismaUsersRepository'

import '../provider'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'
import { PrismaUserTokensRepository } from '../../repositories/prisma/prismaUserTokensRepository'
import { IRoomsRepository } from '../../repositories/IRoomsRepository'
import { PrismaRoomsRepository } from '../../repositories/prisma/prismaRoomsRepository'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { PrismaCategoriesRepository } from '../../repositories/prisma/prismaCategoriesRepository'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { PrismaHousesRepository } from '../../repositories/prisma/prismaHousesRepository'
import { IHouseRoomsRepository } from '../../repositories/IHouseRoomsRepository'
import { PrismaHouseRoomsRepository } from '../../repositories/prisma/prismaHouseRoomsRepository'
import { IHouseImagesRepository } from '../../repositories/IHouseImagesRepository'
import { prismaHouseImagesRepository } from '../../repositories/prisma/prismaHouseImagesRepository'
import { IContactsRepository } from '../../repositories/IContactsRepository'
import { PrismaContactsRepository } from '../../repositories/prisma/prismaContactsRepository'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'
import { prismaAppointmentsRepository } from '../../repositories/prisma/prismaAppointmentsRepository'

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

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  PrismaCategoriesRepository,
)

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  PrismaContactsRepository,
)

container.registerSingleton<IHousesRepository>(
  'HousesRepository',
  PrismaHousesRepository,
)

container.registerSingleton<IHouseRoomsRepository>(
  'HouseRoomsRepository',
  PrismaHouseRoomsRepository,
)

container.registerSingleton<IHouseImagesRepository>(
  'HouseImagesRepository',
  prismaHouseImagesRepository,
)

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  prismaAppointmentsRepository,
)
