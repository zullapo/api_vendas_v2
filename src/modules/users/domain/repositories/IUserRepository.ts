import ICreateUser from "../models/ICreateUser";
import IUser from "../models/IUser";

interface IUserRepository {
	findByName(name: string): Promise<IUser | undefined>
	findById(id: string): Promise<IUser | undefined>
	findByEmail(email: string): Promise<IUser | undefined>
	create(data: ICreateUser): Promise<IUser>
	save(user: IUser): Promise<IUser>
	find(): Promise<IUser[]>
	remove(user: IUser): Promise<void>
}

export default IUserRepository
