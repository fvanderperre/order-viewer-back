
import { Address, Customer, OrderDTO } from "../orders.model"

const ADDRESS_MOCK: Address = {
    city: "Berlin",
    country: "Germany",
    street: "Wriezener Str. 12",
    zip: "13055"
}

const CUSTOMER_MOCK: Customer = {
    email: "emad.alam@construyo.de",
    name: "Emad Alam",
    phone: "015252098067"
}

const ORDER_MOCK: OrderDTO = {
    address: { ...ADDRESS_MOCK },
    bookingDate: 1554284950000,
    customer: { ...CUSTOMER_MOCK },
    title: "Test Order 1",
}

const NOW = Date.now()

export const addressMock = (): Address => ({ ...ADDRESS_MOCK })

export const customerMock = (): Customer => ({ ...CUSTOMER_MOCK })

export const orderMock = (): OrderDTO => ({ ...ORDER_MOCK })

export const badOrderMock = (): OrderDTO => {
    const order = orderMock()
    delete order.address
    delete order.bookingDate
    return order
}

export const ordersMock = (): Array<OrderDTO> => ([orderMock(), orderMock()])

export const badOrdersMock = (): Array<OrderDTO> => ([orderMock(), badOrderMock()])

export const titleMock = (): string => 'new Title'

export const bookingDateMock = (): number => NOW

export const existingOrderUUID = (): string => 'existinguuid'

export const notExistingOrderUUID = (): string => 'notexistinguuid'
