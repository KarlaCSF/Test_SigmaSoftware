import { type NextFunction, type Request, type Response } from 'express'

export default function error (error: unknown, request: Request, response: Response, next: NextFunction): void {
  if (error instanceof Error) {
    response.status(400).send(error.message)
    return
  }

  response.status(500).send('Unexpected error')
}
