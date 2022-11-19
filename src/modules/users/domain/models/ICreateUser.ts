import IUserDto from "./IUserDto"

interface ICreateUser extends IUserDto {
	password: string
}

export default ICreateUser
