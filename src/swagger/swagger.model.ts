import { ApiProperty } from "@nestjs/swagger"
import { Address, Customer, OrderDTO } from "src/orders/orders.model"

export class SwaggerAddress implements Address {
    @ApiProperty()
    city?: string
    @ApiProperty()
    country?: string
    @ApiProperty()
    street?: string
    @ApiProperty()
    zip?: string
}

export class SwaggerCustomer implements Customer {
    @ApiProperty()
    email?: string
    @ApiProperty()
    name?: string
    @ApiProperty()
    phone?: string
}

export class SwaggerOrderDTO implements OrderDTO{
    @ApiProperty()
    address?: SwaggerAddress
    @ApiProperty()
    bookingDate: number
    @ApiProperty()
    customer?: SwaggerCustomer
    @ApiProperty()
    title: string
    @ApiProperty()
    uid?: string
}
