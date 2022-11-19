import ICustomerDto from '@modules/customers/domain/models/ICustomerDto'
import ICustomerRepository from '@modules/customers/domain/repositories/ICustomerRepository'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import Customer from '../entities/Customer'

class CustomerRepository implements ICustomerRepository {
	private ormRepository: Repository<Customer>

	constructor() {
		this.ormRepository = getRepository(Customer)
	}

	public async create({ name, email }: ICustomerDto): Promise<Customer> {
		const customer = await this.create({ name, email })
		return customer
	}

	public async save(customer: Customer): Promise<Customer> {
		await this.ormRepository.save(customer)
		return customer
	}

	public async find(): Promise<Customer[]> {
		return await this.ormRepository.find()
	}

	public async remove(customer: Customer): Promise<void> {
		this.ormRepository.remove(customer)
	}

	async findByName(name: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({
			where: {
				name: name
			}
		})
		return customer
	}

	async findById(id: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({
			where: {
				id: id
			}
		})
		return customer
	}

	async findByEmail(email: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({
			where: {
				email: email
			}
		})
		return customer
	}
}

export default CustomerRepository
