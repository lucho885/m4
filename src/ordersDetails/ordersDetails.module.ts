import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/User.entity"
import { OrdersDetail } from "./OrderDetails.entity";
import { OrdersDetailsService } from "./ordersDetails.service";
import { OrdersDetailsController } from "./ordersDetails.controller";

@Module({
    imports: [
      TypeOrmModule.forFeature([OrdersDetail]), // Registra ambas entidades
    ],
    providers: [OrdersDetailsService],
    controllers: [OrdersDetailsController],
    exports: [OrdersDetailsService]
  })
  export class OrdersDetailModule {}