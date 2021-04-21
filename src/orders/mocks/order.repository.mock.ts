import { Injectable, NotFoundException } from "@nestjs/common"
import { OrderDTO } from "../orders.model"
import { notExistingOrderUID } from "./orders.mock"


@Injectable()
export class OrderRepositoryMock {
    static fakeDatabase: Array<OrderDTO>

    static postOrders = (orders: Array<OrderDTO>): Promise<any> => {
        return Promise.resolve(orders.map(({ bookingDate }) => bookingDate));
    }

    static updateOrder = (orderId: string, title: string, bookingDate: number): Promise<any> => {
        if (orderId === notExistingOrderUID()) {
            throw new NotFoundException()
        }
        return Promise.resolve(bookingDate)
    }

}