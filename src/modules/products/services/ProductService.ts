import AppError from '@shared/errors/AppError'
import RedisCache from '@shared/cache/RedisCache'
import IProduct from '../domain/models/IProduct'
import { Inject } from 'typedi'
import IProductRepository from '../domain/repositories/IProductRepository'

interface ProductDTO {
	name: string
	price: number
	quantity: number
}

class ProductService {
	constructor(
		@Inject('ProductRepository') private productRepository: IProductRepository
	) {}

	async add(data: ProductDTO): Promise<IProduct> {
		const productExists = await this.productRepository.findByName(data.name)
		if (productExists) {
			throw new AppError("There's already a product with this name")
		}

		const redisCache = new RedisCache()

		const product = await this.productRepository.create(data)

		await redisCache.invalidate('api_vendas_products')

		return product
	}

	async get(): Promise<IProduct[]> {
		const redisCache = new RedisCache()

		let products = await redisCache.recover<IProduct[]>('api_vendas_products')

		if (!products) {
			products = await this.productRepository.find()

			await redisCache.save<IProduct[]>('api_vendas_products', products)
		}

		return products
	}

	async getById(id: string): Promise<IProduct> {
		const product = await this.productRepository.findOne(id)

		if (!product) {
			throw new AppError('Product not found')
		}

		return product
	}

	async edit(id: string, data: ProductDTO): Promise<IProduct> {
		const { name, price, quantity } = data

		const product = await this.productRepository.findOne(id)

		if (!product) {
			throw new AppError('Product not found')
		}

		const productExists = await this.productRepository.findByName(name)
		if (productExists) {
			throw new AppError("There's already a product with this name")
		}

		const redisCache = new RedisCache()

		await redisCache.invalidate('api_vendas_products')

		product.name = name
		product.price = price
		product.quantity = quantity

		await this.productRepository.save(product)

		return product
	}

	async remove(id: string): Promise<IProduct> {
		const product = await this.productRepository.findOne(id)

		if (!product) {
			throw new AppError('Product not found')
		}

		const redisCache = new RedisCache()

		await redisCache.invalidate('api_vendas_products')

		await this.productRepository.remove(product)

		return product
	}
}

export default ProductService
