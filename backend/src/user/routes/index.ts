import { type User } from '@prisma/client'
import UserService from '../service'
import { type Express, type Request, type Response } from 'express'
import { validateCreateBody, validateEditBody } from '../../helpers/validateBody'

export const createUser = async (request: Request, response: Response): Promise<void> => {
  const { user, permissions }: { user: User, permissions: string[] } = request.body
  validateCreateBody({ user, permissions })
  await UserService.create(user, permissions)

  response.send({
    success: true
  })
}

export const getAllUsers = async (_request: Request, response: Response): Promise<void> => {
  const users: User[] = await UserService.getAll()

  response.send(users)
}

export const getUser = async (request: Request, response: Response): Promise<void> => {
  const userId = Number(request.params.id)
  const user = await UserService.get(userId)

  response.send(user)
}

export const updateUser = async (request: Request, response: Response): Promise<void> => {
  const userId = Number(request.params.id)
  const { user, permissions }: { user: User, permissions: string[] } = request.body
  validateEditBody({ user, permissions })

  const updatedUser = await UserService.put(user, userId, permissions)

  response.send(updatedUser)
}

const router = (app: Express): Express => {
  app.post('/user', createUser)
  app.get('/user', getAllUsers)
  app.get('/user/:id', getUser)
  app.put('/user/:id', updateUser)

  return app
}

export default router
