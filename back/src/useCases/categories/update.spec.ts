import { beforeEach, describe, expect, it } from 'vitest'
import { CategoriesRepositoryInMemory } from '../../repositories/inMemory/categoriesRepositoryInMemory'
import { UpdateCategoryUseCase } from './update'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'

let categoriesRepository: CategoriesRepositoryInMemory
let updateCategoryUseCase: UpdateCategoryUseCase

describe('Finde all category use case', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory()
    updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository)
  })

  it('should be able update a category', async () => {
    const { id } = await categoriesRepository.create('email')

    const { category } = await updateCategoryUseCase.execute({
      categoryId: id,
      name: 'phone',
    })

    expect(category).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'phone',
      }),
    )
  })

  it('should not be able update a category existent', async () => {
    await expect(
      updateCategoryUseCase.execute({
        categoryId: 'TESTE',
        name: 'phone',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able update a category with name already existent', async () => {
    const { id } = await categoriesRepository.create('phone')
    await categoriesRepository.create('email')

    await expect(
      updateCategoryUseCase.execute({
        categoryId: id,
        name: 'email',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistError)
  })
})
