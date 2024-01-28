import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import routerUser from './user/routes'
import routerPermission from './permission/routes'
import error from './middleware/error'

const app = express()

app.use(express.json())

app.use(cors({
  origin: '*'
}))

routerUser(app)
routerPermission(app)

app.use(error)

export default app
