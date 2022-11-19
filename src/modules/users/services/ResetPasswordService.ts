import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { addHours, isAfter } from 'date-fns'
import { Inject } from 'typedi'
import IResetPasswordDto from '../domain/models/IResetPasswordDto'
import IUserRepository from '../domain/repositories/IUserRepository'
import IUserTokenRepository from '../domain/repositories/IUserTokenRepository'

class ResetPasswordService {
	constructor(
		@Inject('UserRepository') private userRepository: IUserRepository,
		@Inject('UserTokenRepository') private userTokenRepository: IUserTokenRepository
	) {}

	async reset(data: IResetPasswordDto) {
		const { token, password } = data

		const userToken = await this.userTokenRepository.findByToken(token)
		if (!userToken) {
			throw new AppError('User token not found')
		}

		const user = await this.userRepository.findById(userToken.user_id)
		if (!user) {
			throw new AppError('User not found')
		}

		const tokenCreatedAt = userToken.created_at
		const compareDate = addHours(tokenCreatedAt, 2)

		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('Token expired')
		}

		user.password = await hash(password, 8)

		await this.userRepository.save(user)
	}
}

export default ResetPasswordService
