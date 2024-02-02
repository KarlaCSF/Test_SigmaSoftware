import { type Request, type Response } from 'express'
import { createUser } from '../user/routes'
import users from './data'

async function populate (): Promise<void> {
  for (const { user, permissions } of users) {
    const request = { body: { user, permissions } } as unknown as Request
    const response = { send: (e: any) => e } as unknown as Response

    await createUser(request, response)
  }
}

populate().catch(e => { console.log(e) })
