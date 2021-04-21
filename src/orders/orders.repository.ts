import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import { OrderDTO } from "./orders.model";

@Injectable()
export class OrderRepository {
    repository: admin.firestore.Firestore

    constructor(
        private configService: ConfigService
    ) {
        const firebaseConfiguration = this.configService.get<any>('firebase')
        const adminConfig: ServiceAccount = {
            "projectId": firebaseConfiguration.project_id,
            "privateKey": firebaseConfiguration.private_key,
            "clientEmail": firebaseConfiguration.client_email,
        }

        admin.initializeApp({
            credential: admin.credential.cert(adminConfig),
            databaseURL: firebaseConfiguration.database_url,
        })

        this.repository = admin.firestore()
    }


    postOrders = (orders: Array<OrderDTO>): Promise<any> => {
        let batch = this.repository.batch();

        orders.forEach(order => {
            const orderRef = this.repository.collection('orders').doc()
            batch.set(orderRef, order)
        })

        return batch.commit()
            .catch(error => {
                throw new InternalServerErrorException(error)
            })
    }

    updateOrder(orderId: string, title: string, bookingDate: number): Promise<any> {
        const orderRef = this.repository.collection('orders').doc(orderId)

        return orderRef.update({
            title,
            bookingDate,
        }).catch(() => {
            throw new NotFoundException()
        })
    }
}
