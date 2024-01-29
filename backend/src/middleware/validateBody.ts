import { type User } from '@prisma/client'
import { type NextFunction, type Request, type Response } from 'express'

function validateEmail (email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function validateCreateBody (request: Request, _response: Response, next: NextFunction): void {
  const { user, permissions }: { user: User, permissions: string[] } = request.body

  if (user?.firstName.length < 2) throw Error('Invalid firstName')

  const isEmailValid = validateEmail(user?.email)
  if (!isEmailValid) { throw new Error('Invalid email.') }

  if (permissions?.length > 0) {
    console.log(permissions)
    permissions.forEach(permission => {
      if (!permission.startsWith('user:profile:')) { throw new Error('Invalid permission name.') }
    })
  }

  next()
}

export function validateEditBody (request: Request, _response: Response, next: NextFunction): void {
  const { user, permissions }: { user: User, permissions: string[] } = request.body

  if (user?.email !== undefined) {
    const isEmailValid = validateEmail(user.email)

    if (!isEmailValid) { throw new Error('Email is not valid.') }
  }

  if (permissions?.length > 0) {
    permissions.forEach(permission => {
      if (!permission.startsWith('user:profile:')) { throw new Error('Permission name is not valid.') }
    })
  }

  next()
}
