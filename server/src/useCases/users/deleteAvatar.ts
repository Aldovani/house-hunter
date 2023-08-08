import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { LocalStorageProvider } from '../../shared/provider/storage/implementations/LocalStorageProvider'
import { User } from '@prisma/client'

interface DeleteAvatarUseCaseRequest {
  userId: string
}

@injectable()
export class DeleteAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: LocalStorageProvider,
  ) {}

  async execute({ userId }: DeleteAvatarUseCaseRequest) {
    const user = (await this.usersRepository.findById(userId)) as User

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar')
    }

    await this.usersRepository.updateAvatarById(user.id, null)

    user.avatar = null

    return { user }
  }
}
