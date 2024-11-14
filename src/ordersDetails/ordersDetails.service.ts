import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "src/users/User.entity";
import { OrdersDetail } from "./OrderDetails.entity";
import { CreateOrderDetailDto } from "./dto/createOrderDetail.dto";

@Injectable()
export class OrdersDetailsService {
  constructor(
    @InjectRepository(OrdersDetail) private readonly ordersDetailRepository: Repository<OrdersDetail>,
  ) {}

  async create(orderDetail: CreateOrderDetailDto) {
   try{
     // Crear una instancia del OrdersDetail usando el DTO
     const orderDetailEntity = this.ordersDetailRepository.create(orderDetail);

    // Guardar el OrdersDetail en la base de datos
    return await this.ordersDetailRepository.save(orderDetailEntity);
    
   }
   catch(error) {
    throw Error("nose a podido crear")
   }
  }
 
  async findOneByOrderId(orderId:string,relations:string[] = []) : Promise<OrdersDetail[]> {
      return await this.ordersDetailRepository.find({
        where: {order: {id: orderId}},
        relations: relations
      })
  }
}
