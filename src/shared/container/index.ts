import ICustomerRepository from '@modules/customers/domain/repositories/ICustomerRepository'
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository'
import CustomerService from '@modules/customers/services/CustomerService'
import IOrderRepository from '@modules/orders/domain/repositories/IOrderRepository'
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrderRepository'
import OrderService from '@modules/orders/services/OrderService'
import IProductRepository from '@modules/products/domain/repositories/IProductRepository'
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository'
import ProductService from '@modules/products/services/ProductService'
import IUserRepository from '@modules/users/domain/repositories/IUserRepository'
import IUserTokenRepository from '@modules/users/domain/repositories/IUserTokenRepository'
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository'
import AuthenticationService from '@modules/users/services/AuthenticationService'
import AvatarService from '@modules/users/services/AvatarService'
import ForgotPasswordService from '@modules/users/services/ForgotPasswordService'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import UserService from '@modules/users/services/UserService'
import { Container } from 'typedi'

// REPOSITORIES
Container.set<ICustomerRepository>('CustomerRepository', CustomerRepository)
Container.set<IOrderRepository>('OrderRepository', OrderRepository)
Container.set<IProductRepository>('ProductRepository', ProductRepository)
Container.set<IUserRepository>('UserRepository', UserRepository)
Container.set<IUserTokenRepository>('UserTokenRepository', UserTokenRepository)

// SERVICES
Container.set('CustomerService', CustomerService)

Container.set('OrderService', OrderService)

Container.set('ProductService', ProductService)

Container.set('AuthenticationService', AuthenticationService)
Container.set('AvatarService', AvatarService)
Container.set('ForgotPasswordService', ForgotPasswordService)
Container.set('ResetPasswordService', ResetPasswordService)
Container.set('UserService', UserService)
