import ICreateUserToken from '../models/ICreateUserToken'
import IUserToken from '../models/IUserToken'

interface IUserTokenRepository {
	findByToken(token: string): Promise<IUserToken | undefined>
	generate(userId: string): Promise<IUserToken>
	create(data: ICreateUserToken): Promise<IUserToken>
	save(userToken: IUserToken): Promise<IUserToken>
	find(): Promise<IUserToken[]>
	remove(userToken: IUserToken): Promise<void>
}

export default IUserTokenRepository
