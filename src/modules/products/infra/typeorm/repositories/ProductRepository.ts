import IProductDto from '@modules/products/domain/models/IUpdateStockDto'
import ICreateProduct from '@modules/products/domain/models/ICreateProduct'
import IProductRepository from '@modules/products/domain/repositories/IProductRepository'
import { getRepository, Repository } from 'typeorm'
import Product from '../entities/Product'

class ProductRepository implements IProductRepository {
	private ormRepository: Repository<Product>

	constructor() {
		this.ormRepository = getRepository(Product)
	}

	async findByName(name: string): Promise<Product | undefined> {

		const product = await this.ormRepository.findOne({
			where: {
				name: name
			}
		})
		return product
	}

	async create({ name, price, quantity }: ICreateProduct): Promise<Product> {

		const product = this.ormRepository.create({ name, price, quantity })
		return await this.save(product)
	}

	async save(product: Product): Promise<Product> {

		await this.ormRepository.save(product)
		return product
	}

	async updateStock(products: IProductDto[]): Promise<void> {

		await this.ormRepository.save(products);
	} 

	async find(): Promise<Product[]> {

		return await this.ormRepository.find()
	}

	async remove(product: Product): Promise<void> {

		await this.ormRepository.remove(product)
	}

	async findByIds(ids: any[]): Promise<Product[]> {

		return await this.ormRepository.findByIds(ids)
	}

	async findOne(id: string): Promise<Product | undefined> {

		return await this.ormRepository.findOne(id)
	}
}

export default ProductRepository
