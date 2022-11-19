import IUserDto from "./IUserDto"

interface IEditUser extends IUserDto {
	userId: string
	oldPassword?: string
	password?: string
}

export default IEditUser
