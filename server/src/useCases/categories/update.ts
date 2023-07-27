import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { Category } from '@prisma/client'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

interface UpdateCategoryUseCaseRequest {
  name: string
  categoryId: string
}
interface UpdateCategoryUseCaseResponse {
  category: Category
}

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    name,
    categoryId,
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const categoryExists = await this.categoriesRepository.findById(categoryId)

    if (!categoryExists) {
      throw new ResourceNotFoundError()
    }

    const categoryWithNameAlreadyExists =
      await this.categoriesRepository.findByName(name)

    if (categoryWithNameAlreadyExists) {
      throw new ResourceAlreadyExistError()
    }

    const category = await this.categoriesRepository.update({
      name,
      id: categoryId,
    })

    return {
      category,
    }
  }
}
