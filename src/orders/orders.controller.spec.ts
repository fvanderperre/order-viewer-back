import { BadRequestException, NotFoundException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { OrderRepositoryMock } from "./mocks/order.repository.mock"
import {
  invalidOrdersMock,
  bookingDateMock,
  existingOrderUID,
  notExistingOrderUID,
  ordersMock,
  titleMock
} from "./mocks/orders.mock"
import { OrdersController } from "./orders.controller"
import { OrderRepository } from "./orders.repository"
import { OrdersService } from "./orders.service"

describe('AppController', () => {
  let ordersController: OrdersController
  let orderRepositoryMock = {
    postOrders: OrderRepositoryMock.postOrders,
    updateOrder: OrderRepositoryMock.updateOrder,
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, OrderRepository],
    })
      .overrideProvider('OrderRepository')
      .useValue(orderRepositoryMock)
      .compile()

    ordersController = app.get<OrdersController>(OrdersController)
  })

  describe('POST /orders', () => {
    it('should complete with no error if the data are valid', () => {
      const postValidOrders = () => ordersController.postOrders(ordersMock())

      postValidOrders().then((response) => {
        expect(response).toBeTruthy
      })

    })

    it('should throw a Bad Request Exception when called with invalid data', () => {
      const postBadOrder = () => ordersController.postOrders(invalidOrdersMock())

      expect(postBadOrder).toThrow(BadRequestException)
    })
  })

  describe('PUT /order/{orderId}', () => {
    it('shoud complete with no error if the data are valid', () => {
      const updateExistingOrder = () => ordersController.updateOrder(
        existingOrderUID(),
        {
          title: titleMock(),
          bookingDate: bookingDateMock()
        })

      updateExistingOrder().then((order) => {
        expect(order).toBeTruthy
      })
    })

    it('shoud throw a Bad Request Exception when called with invalid data', () => {
      const updateNotExistingOrder = () => ordersController.updateOrder(
        notExistingOrderUID(),
        {
          title: null,
          bookingDate: bookingDateMock()
        }
      )

      expect(updateNotExistingOrder).toThrow(BadRequestException)
    })

    it('shoud throw a Not Found Exception when trying to update an order that does not exist', () => {
      const updateNotExistingOrder = () => ordersController.updateOrder(
        notExistingOrderUID(),
        {
          title: titleMock(),
          bookingDate: bookingDateMock()
        }
      )

      expect(updateNotExistingOrder).toThrow(NotFoundException)
    })
  })

})
