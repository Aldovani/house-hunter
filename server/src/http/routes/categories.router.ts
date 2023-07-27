import { FastifyInstance } from 'fastify'
import { CreateCategoryController } from '../controllers/categories/create'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { UpdateCategoryController } from '../controllers/categories/update'
import { DeleteCategoryController } from '../controllers/categories/delete'
import { FindAllCategoryController } from '../controllers/categories/findAll'
import { ensuredAdmin } from '../middlewares/ensuredAdmin'

const createCategoryController = new CreateCategoryController()
const updateCategoryController = new UpdateCategoryController()
const deleteCategoryController = new DeleteCategoryController()
const findAllCategoryController = new FindAllCategoryController()

export async function categoriesRoutes(app: FastifyInstance) {
  app.post(
    '/categories',
    { onRequest: [ensuredAuth, ensuredAdmin('ADMIN')] },
    createCategoryController.handle,
  )

  app.put(
    '/categories/:id',
    { onRequest: [ensuredAuth] },
    updateCategoryController.handle,
  )

  app.delete(
    '/categories/:id',
    { onRequest: [ensuredAuth] },
    deleteCategoryController.handle,
  )

  app.get(
    '/categories',
    { onRequest: [ensuredAuth] },
    findAllCategoryController.handle,
  )
}
