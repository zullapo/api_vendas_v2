import { Request, Response } from 'express'
import ForgotPasswordService from '@modules/users/services/ForgotPasswordService'
import { container } from 'tsyringe'
import { Container } from 'typedi'

class ForgotPasswordController {
	private service: ForgotPasswordService

	constructor() {
		this.service = Container.get('ForgotPasswordService')
	}

	async sendEmail(request: Request, response: Response): Promise<Response> {
		const { email } = request.body

		await this.service.sendEmail({ email })

		return response.status(204).jsonp()
	}
}

export default ForgotPasswordController
