import { type Permission } from '@prisma/client'
import PermissionService from '../service'
import { type Express } from 'express'

const router = (app: Express): Express => {
  app.post('/permission', async (request, response) => {
    const permission: Permission = request.body
    await PermissionService.create(permission)

    response.send({
      success: true
    })
  })

  return app
}

export default router
