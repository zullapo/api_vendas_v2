import { Request, Response } from 'express'
import AuthenticationService from '@modules/users/services/AuthenticationService'
import { container } from 'tsyringe'
import Container from 'typedi'

class AuthenticationController {
	private service: AuthenticationService

	constructor() {
		this.service = Container.get(AuthenticationService)
		this.authenticate = this.authenticate.bind(this)
	}

	async authenticate(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body

		const login = { email, password }

		const authenticatedUser = await this.service.authenticate(login)

		return response.status(200).jsonp(authenticatedUser)
	}
}

export default AuthenticationController
