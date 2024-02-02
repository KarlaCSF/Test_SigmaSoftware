import prismaClient from '../../client'
import { type Permission } from '@prisma/client'

class PermissionService {
  static async create (permission: Permission): Promise<Permission> {
    return await prismaClient.permission.create({
      data: permission
    })
  }
}

export default PermissionService
