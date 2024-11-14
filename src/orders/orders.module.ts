import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./Order.entity";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/User.entity";
import { OrdersDetail } from "src/ordersDetails/OrderDetails.entity";
import { Product } from "src/products/product.entity";
import { ProductsModule } from "src/products/products.module";
import { OrdersDetailModule } from "src/ordersDetails/ordersDetails.module";
import { UsersService } from "src/users/users.service";
import { OrdersDetailsService } from "src/ordersDetails/ordersDetails.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([Order,OrdersDetail,User,Product]), UsersModule,ProductsModule,OrdersDetailModule,
    ],
    providers: [OrdersService],
    controllers: [OrdersController],
  })
  export class OrdersModule {}