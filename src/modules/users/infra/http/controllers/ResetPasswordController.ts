import { Request, Response } from 'express'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import { container } from 'tsyringe'
import { Container } from 'typedi'

class ResetPasswordController {
	private service: ResetPasswordService

	constructor() {
		this.service = Container.get('ResetPasswordService')
		this.reset = this.reset.bind(this)
	}

	async reset(request: Request, response: Response): Promise<Response> {
		const { password, token } = request.body

		await this.service.reset({ password, token })

		return response.status(204).json()
	}
}

export default ResetPasswordController
