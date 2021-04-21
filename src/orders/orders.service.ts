import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { notExistingOrderUUID } from './mocks/orders.mock'
import { isOrderValid, OrderDTO } from './orders.model'

@Injectable()
export class OrdersService {

    postOrders = (orders: Array<OrderDTO>): Observable<Array<OrderDTO>> => {
        if (orders?.every((order) => isOrderValid(order))) {
            return of(orders)
        }
        throw new BadRequestException()
    }

    updateOrder(orderId: string, title: string, bookingDate: number): Observable<OrderDTO> {
        if (orderId && title && bookingDate) {
            if (orderId === notExistingOrderUUID()) {
                throw new NotFoundException()
            }
            return of({ title, bookingDate })
        }
        throw new BadRequestException()
    }
}
