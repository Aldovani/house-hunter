import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { LocalStorageProvider } from '../../shared/provider/storage/implementations/LocalStorageProvider'
import { MultipartFile } from '@fastify/multipart'
import { User } from '@prisma/client'

interface UpdateAvatarUseCaseRequest {
  file: MultipartFile
  userId: string
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: LocalStorageProvider,
  ) {}

  async execute({ file, userId }: UpdateAvatarUseCaseRequest) {
    const user = (await this.usersRepository.findById(userId)) as User

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar')
    }

    const fileName = await this.storageProvider.save(file, 'avatar')

    await this.usersRepository.updateAvatarById(userId, fileName)

    return { user, file }
  }
}
