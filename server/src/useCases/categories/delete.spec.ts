import { beforeEach, describe, expect, it } from 'vitest'
import { CategoriesRepositoryInMemory } from '../../repositories/inMemory/categoriesRepositoryInMemory'
import { DeleteCategoryUseCase } from './delete'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

let categoriesRepository: CategoriesRepositoryInMemory
let deleteCategoryUseCase: DeleteCategoryUseCase

describe('Delete category use case', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory()
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository)
  })

  it('should be able delete a category', async () => {
    const { id } = await categoriesRepository.create('email')

    await expect(
      deleteCategoryUseCase.execute({
        categoryId: id,
      }),
    ).toBeTruthy()
  })

  it('should not be able delete a new category existent', async () => {
    await expect(
      deleteCategoryUseCase.execute({
        categoryId: 'teste',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
