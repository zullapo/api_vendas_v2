import IUser from "./IUser"

interface IAuthenticationResponse {
	user: IUser
	token: string
}

export default IAuthenticationResponse
