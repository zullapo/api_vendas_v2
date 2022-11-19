import AppError from '@shared/errors/AppError'
import EtherealMail from '@config/mail/EtherealMail'
import path from 'path'
import IForgotPasswordDto from '../domain/models/IForgotPasswordDto'
import { Inject } from 'typedi'
import IUserRepository from '../domain/repositories/IUserRepository'
import IUserTokenRepository from '../domain/repositories/IUserTokenRepository'

class ForgotPasswordService {
	constructor(
		@Inject('UserRepository') private userRepository: IUserRepository,
		@Inject('UserTokenRepository') private userTokenRepository: IUserTokenRepository
	) {}

	async sendEmail(data: IForgotPasswordDto): Promise<void> {
		const { email } = data

		const user = await this.userRepository.findByEmail(email)
		if (!user) {
			throw new AppError('User not found')
		}

		const { token } = await this.userTokenRepository.generate(user.id)

		const templateFile = path.resolve(__dirname, '..', 'views/forgotPassword.hbs')

		await EtherealMail.sendMail({
			to: {
				name: user.name,
				email: user.email
			},
			subject: '[API Vendas] - Reset password',
			templateData: {
				templateFile,
				variables: {
					name: user.name,
					link: `http://localhost:3000/password/reset?token=${token}`
				}
			}
		})
	}
}

export default ForgotPasswordService
