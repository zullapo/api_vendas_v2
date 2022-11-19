import { getRepository, Repository } from 'typeorm'
import Order from '@modules/orders/infra/typeorm/entities/Order'
import IOrderRepository from '@modules/orders/domain/repositories/IOrderRepository'
import IOrderDto from '@modules/orders/domain/models/IOrderDto'

class OrderRepository implements IOrderRepository {
	private ormRepository: Repository<Order>

	constructor() {
		this.ormRepository = getRepository(Order)
	}

	async findById(id: string): Promise<Order | undefined> {
		const order = await this.ormRepository.findOne(id, {
			relations: ['customer', 'order_products']
		})

		return order
	}

	async add(data: IOrderDto): Promise<Order> {
		const { customer, products } = data

		const order = await this.create({ customer, products })

		return order
	}

	async create({ customer, products }: IOrderDto): Promise<Order> {
		const order = await this.ormRepository.create({ customer, order_products: products })
		return await this.save(order)
	}

	async save(order: Order): Promise<Order> {
		await this.ormRepository.save(order)
		return order
	}

	async find(): Promise<Order[]> {
		return await this.ormRepository.find()
	}

	async remove(order: Order): Promise<void> {
		this.ormRepository.remove(order)
	}
}

export default OrderRepository
