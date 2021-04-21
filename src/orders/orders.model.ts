export interface OrderDTO {
    address?: Address
    bookingDate: number
    customer?: Customer
    title: string
    uid?: string
}

export interface Address {
    city?: string
    country?: string
    street?: string
    zip?: string
}

export interface Customer {
    email?: string
    name?: string
    phone?: string
}

export const isOrderValid = ({ address, bookingDate, customer, title }: OrderDTO): boolean =>
    address && bookingDate && customer && title && true

