import { type User } from '@prisma/client'

const users: Array<{ user: Partial<User>, permissions: string[] }> = [
  {
    user: {
      firstName: 'John',
      email: 'john@email.com'
    },
    permissions: [
      'user:profile:view'
    ]
  },
  {
    user: {
      firstName: 'Karla',
      email: 'karla@email.com'
    },
    permissions: [
      'user:profile:edit'
    ]
  },
  {
    user: {
      firstName: 'Daria',
      email: 'daria@email.com'
    },
    permissions: [
      'user:profile:view',
      'user:profile:firstName:edit'
    ]
  }
]

export default users
