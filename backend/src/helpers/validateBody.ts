import { type User } from '@prisma/client'

function validateEmail (email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function validateCreateBody (body: { user: User, permissions: string[] }): void {
  const { user, permissions }: { user: User, permissions: string[] } = body

  if (user?.firstName.length < 2) throw Error('Invalid firstName.')

  const isEmailValid = validateEmail(user?.email)
  if (!isEmailValid) { throw new Error('Invalid email.') }

  if (permissions?.length > 0) {
    permissions.forEach(permission => {
      if (!permission.startsWith('user:profile:')) { throw new Error('Invalid permission name.') }
    })
  }
}

export function validateEditBody (body: { user: User, permissions: string[] }): void {
  const { user, permissions }: { user: User, permissions: string[] } = body

  if (user?.firstName !== undefined) {
    if (user?.firstName.length < 2) throw Error('Invalid firstName.')
  }

  if (user?.email !== undefined) {
    const isEmailValid = validateEmail(user.email)

    if (!isEmailValid) { throw new Error('Invalid email.') }
  }

  if (permissions?.length > 0) {
    permissions.forEach(permission => {
      if (!permission.startsWith('user:profile:')) { throw new Error('Invalid permission name.') }
    })
  }
}
