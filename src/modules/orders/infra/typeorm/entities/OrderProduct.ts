import Product from '@modules/products/infra/typeorm/entities/Product'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'
import Order from './Order'

@Entity('orders_products')
class OrderProduct {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => Order, (order) => order.order_products)
	@JoinColumn({ name: 'order_id' })
	order: Order

	@ManyToOne(() => Product, (product) => product.order_products)
	@JoinColumn({ name: 'product_id' })
	product: Product

	@Column()
	order_id: string

	@Column()
	product_id: string

	@Column('decimal')
	price: number

	@Column('int')
	quantity: number

	@CreateDateColumn()
	created_at: Date

	@CreateDateColumn()
	updated_at: Date
}

export default OrderProduct
