import AppError from '@shared/errors/AppError'
import { compare, hash } from 'bcryptjs'
import IUser from '../domain/models/IUser'
import ICreateUser from '../domain/models/ICreateUser'
import IEditUser from '../domain/models/IEditUser'
import IUserRepository from '../domain/repositories/IUserRepository'
import { Inject, Service } from 'typedi'
import UserRepository from '../infra/typeorm/repositories/UserRepository'

@Service()
class UserService {
	constructor(@Inject('UserRepository') private userRepository: IUserRepository) {}
	async add(user: ICreateUser): Promise<IUser> {
		const { name, email, password } = user

		const emailExists = await this.userRepository.findByEmail(email)
		if (emailExists) {
			throw new AppError("There's already a user with this e-mail")
		}

		const hashedPassword = await hash(password, 8)

		const createdUser = await this.userRepository.create({
			name,
			email,
			password: hashedPassword
		})

		await this.userRepository.save(createdUser)

		return createdUser
	}

	async get(): Promise<IUser[]> {
		const users = await this.userRepository.find()

		return users
	}

	async getById(userId: string): Promise<IUser> {
		const user = await this.userRepository.findById(userId)
		if (!user) {
			throw new AppError('User not found')
		}

		return user
	}

	async edit(data: IEditUser): Promise<IUser> {
		const { name, email, password, oldPassword, userId } = data

		const user = await this.userRepository.findById(userId)

		if (!user) {
			throw new AppError('User not found')
		}

		const userUpdateEmail = await this.userRepository.findByEmail(email)

		if (userUpdateEmail && userUpdateEmail.id !== userId) {
			throw new AppError('Email already used by some user')
		}

		if (password && !oldPassword) {
			throw new AppError('Old password is required')
		}

		if (password && oldPassword) {
			const checkOldPassword = await compare(oldPassword, user.password)

			if (!checkOldPassword) {
				throw new AppError('Old password does not match')
			}

			user.password = await hash(password, 8)
		}

		user.name = name
		user.email = email

		await this.userRepository.save(user)

		return user
	}
}

export default UserService
