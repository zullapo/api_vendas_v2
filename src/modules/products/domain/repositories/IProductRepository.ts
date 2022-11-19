import IProductDto from '@modules/products/domain/models/IUpdateStockDto'
import ICreateProduct from '../models/ICreateProduct'
import IProduct from '../models/IProduct'

interface IProductRepository {
	findByName(name: string): Promise<IProduct | undefined>
	create(data: ICreateProduct): Promise<IProduct>
	save(product: IProduct): Promise<IProduct>
	updateStock(products: IProductDto[]): Promise<void>
	find(): Promise<IProduct[]>
	remove(product: IProduct): Promise<void>
	findByIds(ids: any[]): Promise<IProduct[]>
	findOne(id: string): Promise<IProduct | undefined>
}

export default IProductRepository
