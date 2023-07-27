import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

interface DeleteCategoryUseCaseRequest {
  categoryId: string
}

@injectable()
export class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ categoryId }: DeleteCategoryUseCaseRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findById(
      categoryId,
    )

    if (!categoryAlreadyExists) {
      throw new ResourceNotFoundError()
    }

    await this.categoriesRepository.removeById(categoryId)
  }
}
