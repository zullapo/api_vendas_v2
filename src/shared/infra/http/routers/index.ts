import { Router } from 'express'
import productsRouter from '@modules/products/infra/http/routers/products.router'
import usersRouter from '@modules/users/infra/http/routers/users.router'
import authenticationRouter from '@modules/users/infra/http/routers/authentication.router'
import passwordRouter from '@modules/users/infra/http/routers/password.router'
import customersRouter from '@modules/customers/infra/http/routers/customers.router'
import ordersRouter from '@modules/orders/infra/http/routes/orders.router'

const routers = Router()

routers.use('/products', productsRouter)
routers.use('/users', usersRouter)
routers.use('/login', authenticationRouter)
routers.use('/password', passwordRouter)
routers.use('/customers', customersRouter)
routers.use('/orders', ordersRouter)

export default routers
