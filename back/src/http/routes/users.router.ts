import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../controllers/users/create'
import { UpdateUserController } from '../controllers/users/update'
import { GetUserProfileController } from '../controllers/users/getProfile'
import { ForgotPasswordController } from '../controllers/users/forgotPassword'
import { VerifyCodeForgotPasswordController } from '../controllers/users/vereifyCodeForgotPassword'
import { ChangePasswordController } from '../controllers/users/changePassword'
import { UpdateAvatarController } from '../controllers/users/updateAvatar'

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const getUserProfileController = new GetUserProfileController()
const forgotPasswordController = new ForgotPasswordController()
const changePasswordController = new ChangePasswordController()
const updateAvatarController = new UpdateAvatarController()
const verifyCodeForgotPasswordController =
  new VerifyCodeForgotPasswordController()

export async function userRoutes(app: FastifyInstance) {
  app.post('/', createUserController.handle)
  app.put('/', updateUserController.handle)
  app.get('/:id', getUserProfileController.handle)

  app.put('/avatar', updateAvatarController.handle)

  app.post('/forgot-password', forgotPasswordController.handle)
  app.post(
    '/forgot-password/change/password/:token',
    changePasswordController.handle,
  )
  app.post('/forgot-password/verify', verifyCodeForgotPasswordController.handle)
}
