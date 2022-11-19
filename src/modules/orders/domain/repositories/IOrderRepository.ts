import IOrder from "../models/IOrder";
import IOrderDto from "../models/IOrderDto";

interface IOrderRepository {
	findById(id: string): Promise<IOrder | undefined>
	add(data: IOrderDto): Promise<IOrder>
	create(data: IOrderDto): Promise<IOrder>
	save(order: IOrder): Promise<IOrder>
	find(): Promise<IOrder[]>
	remove(order: IOrder): Promise<void>
}

export default IOrderRepository
