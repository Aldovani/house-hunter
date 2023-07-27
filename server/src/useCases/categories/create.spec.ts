import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCategoryUseCase } from './create'
import { CategoriesRepositoryInMemory } from '../../repositories/inMemory/categoriesRepositoryInMemory'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'

let categoriesRepository: CategoriesRepositoryInMemory
let createCategoryContactUseCase: CreateCategoryUseCase

describe('Create category use case', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory()
    createCategoryContactUseCase = new CreateCategoryUseCase(
      categoriesRepository,
    )
  })

  it('should be able create a new category', async () => {
    const { category } = await createCategoryContactUseCase.execute({
      name: 'email',
    })

    expect(category).toEqual(
      expect.objectContaining({ id: expect.any(String), name: 'email' }),
    )
  })

  it('should not be able create a new category with the same name', async () => {
    await createCategoryContactUseCase.execute({
      name: 'email',
    })

    await expect(
      createCategoryContactUseCase.execute({
        name: 'email',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistError)
  })
})
