import { type User } from '@prisma/client'
import { prismaMock } from '../singleton'
import { createUser, getAllUsers, getUser, updateUser } from '../user/routes'
import { type Request, type Response } from 'express'

describe('Test User Crud', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  let response: Response
  let user: User & { permissions: string[] }
  beforeEach(() => {
    response = { send: (e: any) => e } as unknown as Response
    user = {
      id: 1,
      firstName: 'John',
      email: 'john@mail.com',
      permissions: ['user:profile:view']
    }
  })

  test('should create new user', async () => {
    prismaMock.user.create.mockResolvedValue(user)

    const request = { body: { user } } as unknown as Request

    const spy = jest.spyOn(response, 'send')

    await createUser(request, response)
    expect(spy).toHaveBeenCalled()
  })

  test('should update new user', async () => {
    prismaMock.user.update.mockResolvedValue(user)

    const request = { body: { user }, params: { id: 1 } } as unknown as Request

    const spy = jest.spyOn(response, 'send')

    await updateUser(request, response)
    expect(spy).toHaveBeenCalled()
  })

  describe('Should NOT create user', () => {
    test('with invalid email', async () => {
      user.email = 'john'
      prismaMock.user.create.mockResolvedValue(user)

      const request = { body: { user } } as unknown as Request

      await expect(createUser(request, response)).rejects.toThrow('Invalid email.')
    })

    test('with invalid name', async () => {
      user.firstName = 'J'
      prismaMock.user.create.mockResolvedValue(user)

      const request = { body: { user } } as unknown as Request

      await expect(createUser(request, response)).rejects.toThrow('Invalid firstName.')
    })

    test('with invalid permission', async () => {
      const permissions = ['user:invalid']
      prismaMock.user.create.mockResolvedValue(user)

      const request = { body: { user, permissions } } as unknown as Request

      await expect(createUser(request, response)).rejects.toThrow('Invalid permission name.')
    })
  })

  describe('Should get user', () => {
    test('all users', async () => {
      prismaMock.user.findMany.mockResolvedValue([user])

      const request = {} as unknown as Request

      const spy = jest.spyOn(response, 'send')

      await getAllUsers(request, response)
      expect(spy).toHaveBeenCalled()
    })

    test('one user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user)

      const request = { params: { id: 1 } } as unknown as Request

      const spy = jest.spyOn(response, 'send')

      await getUser(request, response)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('Should update user', () => {
    test('without name', async () => {
      // @ts-expect-error Not necessary
      delete user.firstName
      prismaMock.user.update.mockResolvedValue(user)

      const request = { body: { user }, params: { id: 1 } } as unknown as Request

      const spy = jest.spyOn(response, 'send')

      await updateUser(request, response)
      expect(spy).toHaveBeenCalled()
    })

    test('without email', async () => {
      // @ts-expect-error Not necessary
      delete user.email
      prismaMock.user.update.mockResolvedValue(user)

      const request = { body: { user }, params: { id: 1 } } as unknown as Request

      const spy = jest.spyOn(response, 'send')

      await updateUser(request, response)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('Should NOT update user', () => {
    test('with invalid email', async () => {
      user.email = 'john'
      prismaMock.user.update.mockResolvedValue(user)

      const request = { body: { user }, params: { id: 1 } } as unknown as Request

      await expect(updateUser(request, response)).rejects.toThrow('Invalid email.')
    })

    test('with invalid name', async () => {
      user.firstName = 'J'
      prismaMock.user.update.mockResolvedValue(user)

      const request = { body: { user }, params: { id: 1 } } as unknown as Request

      await expect(updateUser(request, response)).rejects.toThrow('Invalid firstName.')
    })

    test('with invalid permission', async () => {
      const permissions = ['user:invalid']
      prismaMock.user.update.mockResolvedValue(user)

      const request = { body: { user, permissions }, params: { id: 1 } } as unknown as Request

      await expect(updateUser(request, response)).rejects.toThrow('Invalid permission name.')
    })
  })
})
