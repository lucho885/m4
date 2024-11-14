import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { OrdersDetailsService } from "./ordersDetails.service";


@Controller('orders')
export class OrdersDetailsController{
    constructor(private readonly ordersDetailService : OrdersDetailsService 
    ){}
  
}