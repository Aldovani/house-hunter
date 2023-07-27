import { hash } from 'bcrypt'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { EmailAlreadyExistsError } from '../../shared/errors/EmailAlreadyExistsError'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, name, password }: CreateUserUseCaseRequest) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    })

    return {
      user,
    }
  }
}
