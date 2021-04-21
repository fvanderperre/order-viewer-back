
import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { OrderDTO } from './orders.model'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    postOrders(
        @Body() orders: Array<OrderDTO>
    ): Promise<any> {
        return this.ordersService.postOrders(orders)
    }

    @Put('/:orderId')
    updateOrder(
        @Param('orderId') orderId: string,
        @Body() { title, bookingDate }: OrderDTO
    ): Promise<any> {
        return this.ordersService.updateOrder(orderId, title, bookingDate)
    }
}
