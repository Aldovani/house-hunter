import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../controllers/users/create'
import { UpdateUserController } from '../controllers/users/update'
import { GetUserProfileController } from '../controllers/users/getProfile'
import { ForgotPasswordController } from '../controllers/users/forgotPassword'
import { VerifyCodeForgotPasswordController } from '../controllers/users/vereifyCodeForgotPassword'
import { ChangePasswordController } from '../controllers/users/changePassword'
import { UpdateAvatarController } from '../controllers/users/updateAvatar'
import { AuthenticateController } from '../controllers/users/authenticate'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { RefreshTokenController } from '../controllers/users/refreshToken'

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const getUserProfileController = new GetUserProfileController()
const forgotPasswordController = new ForgotPasswordController()
const changePasswordController = new ChangePasswordController()
const updateAvatarController = new UpdateAvatarController()
const verifyCodeForgotPasswordController =
  new VerifyCodeForgotPasswordController()
const authenticateController = new AuthenticateController()
const refreshTokenController = new RefreshTokenController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUserController.handle)
  app.put('/users', { onRequest: [ensuredAuth] }, updateUserController.handle)
  app.get('/me', { onRequest: [ensuredAuth] }, getUserProfileController.handle)

  app.put(
    '/users/avatar',
    { onRequest: [ensuredAuth] },
    updateAvatarController.handle,
  )

  app.post('/forgot-password', forgotPasswordController.handle)
  app.post('/change-password/:token', changePasswordController.handle)
  app.post('/forgot-password/verify', verifyCodeForgotPasswordController.handle)

  app.post('/auth', authenticateController.handle)
  app.patch('/token/refresh', refreshTokenController.handle)
}
