import AppError from '@shared/errors/AppError'
import { Inject } from 'typedi'
import ICustomer from '../domain/models/ICustomer'
import ICustomerDto from '../domain/models/ICustomerDto'
import ICustomerRepository from '../domain/repositories/ICustomerRepository'

class CustomerService {
	constructor(
		@Inject('CustomerRepository') private customerRepository: ICustomerRepository
	) {}
	
	async add(data: ICustomerDto): Promise<ICustomer> {
		const { name, email } = data

		const emailExists = await this.customerRepository.findByEmail(email)
		if (emailExists) {
			throw new AppError('Email address already used by some user')
		}

		const customer = await this.customerRepository.create({ name, email })

		return customer
	}

	async get(): Promise<ICustomer[]> {
		const customers = await this.customerRepository.find()

		return customers
	}

	async getById(id: string): Promise<ICustomer> {
		const customer = await this.customerRepository.findById(id)
		if (!customer) {
			throw new AppError('Customer not found')
		}

		return customer
	}

	async edit(id: string, data: ICustomerDto): Promise<ICustomer> {
		const { name, email } = data

		const customer = await this.customerRepository.findById(id)
		if (!customer) {
			throw new AppError('Customer not found')
		}

		const customerEmail = await this.customerRepository.findByEmail(email)
		if (customerEmail && customer.email !== email) {
			throw new AppError('Email address already used by some user')
		}

		customer.name = name
		customer.email = email

		await this.customerRepository.save(customer)

		return customer
	}

	async remove(id: string): Promise<ICustomer> {
		const customer = await this.customerRepository.findById(id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		await this.customerRepository.remove(customer)

		return customer
	}
}

export default CustomerService
