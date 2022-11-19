import { Request, Response } from 'express'
import AvatarService from '@modules/users/services/AvatarService'
import { container } from 'tsyringe'
import { Container } from 'typedi'

class AvatarController {
	private service: AvatarService

	constructor() {
		this.service = Container.get('AvatarService')
		this.update = this.update.bind(this)
	}

	async update(request: Request, response: Response): Promise<Response> {
		const data = { userId: request.user.id, avatarFilename: request.file?.filename }

		const updatedUser = await this.service.update(data)

		return response.status(200).jsonp(updatedUser)
	}
}

export default AvatarController
