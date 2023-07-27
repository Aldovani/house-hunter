import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { Category } from '@prisma/client'

interface FindAllCategoryUseCaseResponse {
  category: Category[]
}

@injectable()
export class FindAllCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<FindAllCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findAll()

    return {
      category,
    }
  }
}
