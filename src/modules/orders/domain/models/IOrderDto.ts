import ICustomer from '@modules/customers/domain/models/ICustomer'
import ICreateOrderProducts from './ICreateOrderProducts'

interface IOrderDto {
	customer: ICustomer
	products: ICreateOrderProducts[]
}

export default IOrderDto
