import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration'
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrderRepository],
})
export class OrdersModule { }
