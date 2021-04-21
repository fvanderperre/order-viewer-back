import { BadRequestException, Injectable } from '@nestjs/common'
import { isOrderValid, OrderDTO } from './orders.model'
import { OrderRepository } from './orders.repository'

@Injectable()
export class OrdersService {
    constructor(private orderRepository: OrderRepository) { }


    postOrders = (orders: Array<OrderDTO>): Promise<any> => {
        if (orders?.every((order) => isOrderValid(order))) {
            return this.orderRepository.postOrders(orders)
        }
        throw new BadRequestException()
    }

    updateOrder(orderId: string, title: string, bookingDate: number): Promise<any> {
        if (orderId && title && bookingDate) {
            return this.orderRepository.updateOrder(orderId, title, bookingDate)
        }
        throw new BadRequestException()
    }
}
