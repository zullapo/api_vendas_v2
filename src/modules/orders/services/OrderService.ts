import AppError from '@shared/errors/AppError'
import IOrder from '../domain/models/IOrder'
import IProductDto from '../../products/domain/models/IUpdateStockDto'
import ICreateOrder from '../domain/models/ICreateOrder'
import IUpdateStockDto from '../../products/domain/models/IUpdateStockDto'
import { Inject } from 'typedi'
import IProductRepository from '@modules/products/domain/repositories/IProductRepository'
import ICustomerRepository from '@modules/customers/domain/repositories/ICustomerRepository'
import IOrderRepository from '../domain/repositories/IOrderRepository'

class OrderService {
	constructor(
		@Inject('OrderRepository') private orderRepository: IOrderRepository,
		@Inject('CustomerRepository') private customerRepository: ICustomerRepository,
		@Inject('ProductRepository') private productRepository: IProductRepository
	) {}

	async add(data: ICreateOrder): Promise<IOrder> {
		const { customer_id, products } = data

		const customer = await this.customerRepository.findById(customer_id)
		if (!customer) {
			throw new AppError('Customer not found')
		}

		const existentProducts = await this.productRepository.findByIds(
			products.map((product) => product.id)
		)

		if (!existentProducts) {
			throw new AppError(`Couldn't find any product`)
		}

		const existentProductsIds = existentProducts.map(
			(product: IProductDto) => product.id
		)

		const inexistentProducts = products.filter(
			(product) => !existentProductsIds.includes(product.id)
		)

		if (inexistentProducts.length) {
			throw new AppError(
				`Couldn't find product with the given id: ${inexistentProducts[0].id}`
			)
		}

		const isQuantityNotAvailable = (product: IUpdateStockDto) =>
			existentProducts.filter((p) => p.id === product.id)[0].quantity <
			product.quantity

		const notAvailableQuantityProducts = products.filter((product) =>
			isQuantityNotAvailable(product)
		)

		if (notAvailableQuantityProducts.length) {
			throw new AppError(
				`The quantity ${notAvailableQuantityProducts[0].quantity} is not available
				for product with the given id: ${notAvailableQuantityProducts[0].id}`
			)
		}

		const serializedProducts = products.map((product) => ({
			product_id: product.id,
			quantity: product.quantity,
			price: existentProducts.filter((p) => p.id == product.id)[0].price
		}))

		const order = await this.orderRepository.create({
			customer: customer,
			products: serializedProducts
		})

		const { order_products } = order

		const updatedProductQuantity = order_products.map((order_product) => ({
			id: order_product.product_id,
			quantity:
				existentProducts.filter((p) => p.id === order_product.product_id)[0]
					.quantity - order_product.quantity
		}))

		await this.productRepository.updateStock(updatedProductQuantity)

		return order
	}

	async getById(id: string): Promise<IOrder> {
		const order = await this.orderRepository.findById(id)
		if (!order) {
			throw new AppError('Order not found')
		}

		return order
	}
}

export default OrderService
