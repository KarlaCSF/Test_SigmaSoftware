import { type User } from '@prisma/client'

const users: Array<{ user: Partial<User>, permissions: string[] }> = [
  {
    user: {
      firstName: 'John',
      email: 'john1@email.com'
    },
    permissions: [
      'user:profile:view'
    ]
  },
  {
    user: {
      firstName: 'Karla',
      email: 'karla2@email.com'
    },
    permissions: [
      'user:profile:edit'
    ]
  },
  {
    user: {
      firstName: 'Daria',
      email: 'daria3@email.com'
    },
    permissions: [
      'user:profile:view',
      'user:profile:name:edit'
    ]
  }
]

export default users
