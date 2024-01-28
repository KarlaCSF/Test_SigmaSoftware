import prismaClient from '../../script'
import { type User } from '@prisma/client'

class UserService {
  static async create (user: User, permissions: string[] = []): Promise<User> {
    return await prismaClient.user.create({
      data: {
        ...user,
        permissions: {
          connectOrCreate: permissions.map(permissionName => {
            return {
              where: { name: permissionName },
              create: { name: permissionName }
            }
          })
        }
      }
    })
  }

  static async get (userId: number): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: { permissions: true }
    })

    if (user === null) {
      throw new Error('User not found')
    }

    return user
  }

  static async put (user: Partial<User>, userId: number, permissions: string[] = []): Promise<User> {
    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        ...user,
        permissions: {
          connectOrCreate: permissions.map(permissionName => {
            return {
              where: { name: permissionName },
              create: { name: permissionName }
            }
          })
        }
      },
      include: {
        permissions: true
      }
    })

    return updatedUser
  }
}

export default UserService
