import { BadRequestException, NotFoundException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { badOrdersMock, bookingDateMock, existingOrderUUID, notExistingOrderUUID, ordersMock, titleMock } from "./mocks/orders.mock"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"

describe('AppController', () => {
  let ordersController: OrdersController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile()

    ordersController = app.get<OrdersController>(OrdersController)
  })

  describe('POST /orders', () => {
    it('should return the created orders when the request completes', () => {
      const postValidOrder = () => ordersController.postOrders(ordersMock())

      postValidOrder().subscribe((order) => {
        expect(order).toBeTruthy
      })

    })

    it('should throw a Bad Request Exception when called with invalid data', () => {
      const postBadOrder = () => ordersController.postOrders(badOrdersMock())

      expect(postBadOrder).toThrow(BadRequestException)
    })
  })

  describe('PUT /order/{orderId}', () => {
    it('shoud return the updated order when the request completes', () => {
      const updateExistingOrder = () => ordersController.updateOrder(
        existingOrderUUID(),
        {
          title: titleMock(),
          bookingDate: bookingDateMock()
        })

      updateExistingOrder().subscribe((order) => {
        expect(order).toBeTruthy
      })
    })

    it('shoud throw a Bad Request Exception when called with invalid data', () => {
      const updateNotExistingOrder = () => ordersController.updateOrder(
        notExistingOrderUUID(),
        {
          title: null,
          bookingDate: bookingDateMock()
        }
      )

      expect(updateNotExistingOrder).toThrow(BadRequestException)

    })

    it('shoud throw a Not Found Exception when trying to update an order that does not exist', () => {
      const updateNotExistingOrder = () => ordersController.updateOrder(
        notExistingOrderUUID(),
        {
          title: titleMock(),
          bookingDate: bookingDateMock()
        }
      )

      expect(updateNotExistingOrder).toThrow(NotFoundException)

    })
  })

})
