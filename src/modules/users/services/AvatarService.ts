import AppError from '@shared/errors/AppError'
import path from 'path'
import uploadConfig from '@config/upload'
import fs from 'fs'
import IAvatarDTO from '../domain/models/IAvatarDto'
import IUser from '../domain/models/IUser'
import { Inject } from 'typedi'
import IUserRepository from '../domain/repositories/IUserRepository'

class AvatarService {
	constructor(@Inject('UserRepository') private userRepository: IUserRepository) {}

	async update(data: IAvatarDTO): Promise<IUser> {
		const { userId, avatarFilename } = data

		if (!avatarFilename) {
			throw new AppError('No avatar sent')
		}

		const user = await this.userRepository.findById(userId)
		if (!user) {
			throw new AppError('User not found')
		}

		if (user.avatar) {
			const avatarPath = path.join(uploadConfig.directory, user.avatar)
			const avatarExists = await fs.promises.stat(avatarPath)
			if (avatarExists) {
				await fs.promises.unlink(avatarPath)
			}
		}

		user.avatar = avatarFilename

		await this.userRepository.save(user)

		return user
	}
}

export default AvatarService
