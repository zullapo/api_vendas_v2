import IProduct from '@modules/products/domain/models/IProduct'

interface ICreateOrder {
	customer_id: string
	products: IProduct[]
}

export default ICreateOrder
