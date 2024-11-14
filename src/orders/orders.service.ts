import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./Order.entity";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { ProductId, createeOrderDto } from "./order.dto";
import { CreateOrderDto } from "src/dto/createOrderDto";
import { User } from "src/users/User.entity";
import { UsersService } from "src/users/users.service";
import { OrdersDetailsService } from "src/ordersDetails/ordersDetails.service";

import { ProductService } from "src/products/product.service";
import { CreateOrderDetailDto } from "src/ordersDetails/dto/createOrderDetail.dto";
import { OrdersDetail } from "src/ordersDetails/OrderDetails.entity";
import { OrderResponseDto } from "./orderResponse.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) 
    private readonly ordersRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly productService: ProductService,
    private readonly orderDetailsService: OrdersDetailsService,
    private readonly dataSource: DataSource
  ) {}
  
    private async calculateTotal(products: Array<ProductId>, queryRunner: QueryRunner): Promise<number>{
      let total = 0;
      for(const product of products){
        const cantidad = Number(await this.productService.buyProduct(product.id, queryRunner));
        total += cantidad;
      }
      return total
    }

    

    async createOrder(createOrderDto :  CreateOrderDto) {
      const {userId, products} = createOrderDto;

      const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect(); // Conectar el QueryRunner
    await queryRunner.startTransaction(); // Iniciar una transacción

    try {
       // Buscar el usuario utilizando el queryRunner.manager
       const user = await queryRunner.manager.findOne(User, { where: { id: userId } });
     
      if (!user) {
        throw new Error("User not found");
      }
      

        // 2. Crear la orden usando QueryRunner y la entidad Order
        const order = queryRunner.manager.create(Order, {
            date: new Date(),
            user: user,  // Asociar la orden con el usuario
          });
         await queryRunner.manager.save(order);
         
     const total = await this.calculateTotal(products, queryRunner);
     
     const orderDetailDto = new CreateOrderDetailDto();
     orderDetailDto.price = total;
     orderDetailDto.products = products;
     orderDetailDto.order = order;

     
     const orderDetailEntity =  queryRunner.manager.create(OrdersDetail,orderDetailDto)
     await queryRunner.manager.save(orderDetailEntity);
     await queryRunner.commitTransaction();
      return new OrderResponseDto(orderDetailEntity)


    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction(); // Deshacer la transacción
    } finally {
      await queryRunner.release(); // Liberar el QueryRunner
    }

    }

    async findOne(id:string) {
      const order = await this.ordersRepository.findOneBy({id})
      const orderDetail = await this.orderDetailsService.findOneByOrderId(
        order.id,
        ["products", "order"]
      );
      return orderDetail 
    }
}
