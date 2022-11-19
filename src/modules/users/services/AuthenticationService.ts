import AppError from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import IAuthenticationResponse from '../domain/models/IAuthenticationResponse'
import IAuthenticationDto from '../domain/models/IAuthenticationDto'
import { Inject } from 'typedi'
import IUserRepository from '../domain/repositories/IUserRepository'
import { Service } from 'typedi'
import UserRepository from '../infra/typeorm/repositories/UserRepository'

@Service()
class AuthenticationService {
	constructor(@Inject() private userRepository: UserRepository) {}
	
	async authenticate(data: IAuthenticationDto): Promise<IAuthenticationResponse> {
		const { email, password } = data

		const user = await this.userRepository.findByEmail(email)
		if (!user) {
			throw new AppError("There's no user with this e-mail", 401)
		}

		const isPasswordValid = await compare(password, user.password)
		if (!isPasswordValid) {
			throw new AppError('Incorrect password', 401)
		}

		const token = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn
		})

		return {
			user,
			token
		}
	}
}

export default AuthenticationService
