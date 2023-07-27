import { Category } from '@prisma/client'

export interface UpdateCategoryParams {
  name: string
  id: string
}

export interface ICategoriesRepository {
  create(name: string): Promise<Category>
  update(data: UpdateCategoryParams): Promise<Category>
  removeById(id: string): Promise<void>
  findAll(): Promise<Category[]>
  findByName(name: string): Promise<Category | null>
  findById(id: string): Promise<Category | null>
}
