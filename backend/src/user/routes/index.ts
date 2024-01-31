import { type User } from '@prisma/client'
import UserService from '../service'
import { type Express } from 'express'
import { validateCreateBody, validateEditBody } from '../../middleware/validateBody'

const router = (app: Express): Express => {
  app.post('/user', validateCreateBody, async (request, response) => {
    const { user, permissions }: { user: User, permissions: string[] } = request.body
    await UserService.create(user, permissions)

    response.send({
      success: true
    })
  })

  app.get('/user', async (_request, response) => {
    const users: User[] = await UserService.getAll()

    response.send(users)
  })

  app.get('/user/:id', async (request, response) => {
    const userId = Number(request.params.id)
    const user = await UserService.get(userId)

    response.send(user)
  })

  app.put('/user/:id', validateEditBody, async (request, response) => {
    const userId = Number(request.params.id)
    const { user, permissions }: { user: User, permissions: string[] } = request.body

    const updatedUser = await UserService.put(user, userId, permissions)

    response.send(updatedUser)
  })

  return app
}

export default router
