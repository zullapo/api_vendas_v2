import ICreateUserToken from '@modules/users/domain/models/ICreateUserToken'
import IUserToken from '@modules/users/domain/models/IUserToken'
import IUserTokenRepository from '@modules/users/domain/repositories/IUserTokenRepository'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import UserToken from '../entities/UserToken'

class UserTokenRepository implements IUserTokenRepository {
	private ormRepository: Repository<UserToken>

	constructor() {
		this.ormRepository = getRepository(UserToken)
	}

	async findByToken(token: string): Promise<UserToken | undefined> {
		const userToken = await this.ormRepository.findOne({
			where: {
				token
			}
		})

		return userToken
	}

	async generate(userId: string): Promise<UserToken> {
		const userToken = await this.create({
			user_id: userId
		})

		return userToken
	}

	async create({ user_id }: ICreateUserToken): Promise<IUserToken> {
		const userToken = this.ormRepository.create({ user_id })
		return await this.save(userToken)
	}

	async save(userToken: IUserToken): Promise<IUserToken> {
		await this.ormRepository.save(userToken)
		return userToken
	}

	async find(): Promise<IUserToken[]> {
		return await this.ormRepository.find()
	}

	async remove(userToken: IUserToken): Promise<void> {
		await this.ormRepository.remove(userToken)
	}
}

export default UserTokenRepository
