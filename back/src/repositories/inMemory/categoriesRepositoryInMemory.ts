import { Category } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  ICategoriesRepository,
  UpdateCategoryParams,
} from '../ICategoriesRepository'

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = []

  async create(name: string): Promise<Category> {
    const category = {
      name,
      id: randomUUID(),
    }

    this.categories.push(category)

    return category
  }

  async findAll(): Promise<Category[]> {
    return this.categories
  }

  async removeById(id: string): Promise<void> {
    const categories = this.categories.filter((category) => category.id !== id)

    this.categories = categories
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name)

    if (!category) {
      return null
    }
    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id)

    if (!category) {
      return null
    }
    return category
  }

  async update(data: UpdateCategoryParams): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      (item) => item.id === data.id,
    )

    const contact: Category = {
      id: data.id,
      name: data.name,
    }

    this.categories[categoryIndex] = contact

    return contact
  }
}
