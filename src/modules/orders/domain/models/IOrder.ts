import ICustomer from "@modules/customers/domain/models/ICustomer"
import IOrderProduct from "./IOrderProduct"

interface IOrder {
	id: string
	customer: ICustomer
	order_products: IOrderProduct[]
	created_at: Date
	updated_at: Date
}

export default IOrder
