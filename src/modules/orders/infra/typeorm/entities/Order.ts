import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import IOrder from '@modules/orders/domain/models/IOrder'
import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'
import OrderProduct from './OrderProduct'

@Entity('orders')
class Order implements IOrder {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => Customer)
	@JoinColumn({ name: 'customer_id' })
	customer: Customer

	@OneToMany(() => OrderProduct, (order_products) => order_products.order, {
		cascade: true
	})
	order_products: OrderProduct[]

	@CreateDateColumn()
	created_at: Date

	@CreateDateColumn()
	updated_at: Date
}

export default Order
