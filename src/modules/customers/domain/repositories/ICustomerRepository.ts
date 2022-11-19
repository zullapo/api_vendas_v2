import ICustomer from "../models/ICustomer";
import ICustomerDto from "../models/ICustomerDto";

interface ICustomerRepository {
	findByName(name: string): Promise<ICustomer | undefined>
	findById(id: string): Promise<ICustomer | undefined>
	findByEmail(email: string): Promise<ICustomer | undefined>
	create(data: ICustomerDto): Promise<ICustomer>
	save(customer: ICustomer): Promise<ICustomer>
	find(): Promise<ICustomer[]>
	remove(customer: ICustomer): Promise<void>
}

export default ICustomerRepository
