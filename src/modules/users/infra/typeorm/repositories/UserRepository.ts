import ICreateUser from '@modules/users/domain/models/ICreateUser'
import IUserRepository from '@modules/users/domain/repositories/IUserRepository'
import { Inject, Service } from 'typedi'
import { getRepository, Repository } from 'typeorm'
import User from '../entities/User'

@Service()
class UserRepository implements IUserRepository {
	private ormRepository: Repository<User>

	constructor() {
		this.ormRepository = getRepository(User)
	}

	async findByName(name: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({
			where: {
				name: name
			}
		})
		return user
	}

	async findById(id: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({
			where: {
				id: id
			}
		})
		return user
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({
			where: {
				email: email
			}
		})
		return user
	}

	async create({ name, email, password }: ICreateUser): Promise<User> {
		const user = this.ormRepository.create({ name, email, password })
		return await this.save(user)
	}

	async save(user: User): Promise<User> {
		await this.ormRepository.save(user)
		return user
	}

	async find(): Promise<User[]> {
		return await this.ormRepository.find()
	}

	async remove(user: User): Promise<void> {
		await this.ormRepository.remove(user)
	}
}

export default UserRepository
