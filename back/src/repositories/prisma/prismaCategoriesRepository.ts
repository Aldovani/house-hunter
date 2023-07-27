import { Category } from '@prisma/client'
import {
  ICategoriesRepository,
  UpdateCategoryParams,
} from '../ICategoriesRepository'
import { prisma } from '../../libs/prisma'

export class PrismaCategoriesRepository implements ICategoriesRepository {
  async create(name: string): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        name,
      },
    })

    return category
  }

  async update(data: UpdateCategoryParams): Promise<Category> {
    const category = prisma.category.update({
      data: {
        name: data.name,
      },
      where: {
        id: data.id,
      },
    })

    return category
  }

  async removeById(id: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id,
      },
    })
  }

  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany()

    return categories
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    })

    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    return category
  }
}
