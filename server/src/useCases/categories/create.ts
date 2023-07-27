import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { Category } from '@prisma/client'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'

interface CreateCategoryUseCaseRequest {
  name: string
}
interface CreateCategoryUseCaseResponse {
  category: Category
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    name,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    )

    if (categoryAlreadyExists) {
      throw new ResourceAlreadyExistError()
    }

    const category = await this.categoriesRepository.create(name)

    return {
      category,
    }
  }
}
