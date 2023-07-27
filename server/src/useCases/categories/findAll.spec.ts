import { beforeEach, describe, expect, it } from 'vitest'
import { CategoriesRepositoryInMemory } from '../../repositories/inMemory/categoriesRepositoryInMemory'
import { FindAllCategoryUseCase } from './findAll'

let categoriesRepository: CategoriesRepositoryInMemory
let findAllCategoryUseCase: FindAllCategoryUseCase

describe('Finde all category use case', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory()
    findAllCategoryUseCase = new FindAllCategoryUseCase(categoriesRepository)
  })

  it('should be able delete a category', async () => {
    await categoriesRepository.create('email')
    await categoriesRepository.create('phone')

    const { category } = await findAllCategoryUseCase.execute()

    expect(category.length).toBe(2)
    expect(category).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: 'email',
        }),
        expect.objectContaining({
          id: expect.any(String),
          name: 'phone',
        }),
      ]),
    )
  })
})
