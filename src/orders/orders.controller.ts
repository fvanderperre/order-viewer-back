
import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { SwaggerOrderDTO } from 'src/swagger/swagger.model'
import { OrderDTO } from './orders.model'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @ApiBody({ type: [SwaggerOrderDTO] })
    postOrders(
        @Body() orders: OrderDTO[]
    ): Promise<any> {
        return this.ordersService.postOrders(orders)
    }

    @Put('/:orderId')
    @ApiBody({ type: SwaggerOrderDTO })
    updateOrder(
        @Param('orderId') orderId: string,
        @Body() { title, bookingDate }: OrderDTO
    ): Promise<any> {
        return this.ordersService.updateOrder(orderId, title, bookingDate)
    }
}
