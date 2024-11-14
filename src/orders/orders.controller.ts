import { Body, Controller, Get, Injectable, Param, Post, UseGuards } from "@nestjs/common";
import { createeOrderDto } from "./order.dto";
import { CreateOrderDto } from "src/dto/createOrderDto";
import { OrdersService } from "./orders.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Orders")
@Controller('orders')
export class OrdersController{
    constructor(private readonly ordersService : OrdersService 
    ){}

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Post()
createOrder(@Body() data : CreateOrderDto){
 return this.ordersService.createOrder(data);
}

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Get(":id") 
getOrderByIdController(@Param("id") id : string) {
   return this.ordersService.findOne(id);
}
  
}