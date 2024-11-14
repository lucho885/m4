import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { OrdersDetail } from "../ordersDetails/OrderDetails.entity";
import { User } from "../users/User.entity";

@Entity({
  name: "orders",
})
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();

  @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  // Relación One-to-One con OrderDetail
  @OneToOne(() => OrdersDetail, orderDetail => orderDetail.order)
  @JoinColumn() // Esto indica que Order es la entidad dueña de la relación
  orderDetails: OrdersDetail;

   // Relación Many-to-One con User
   @ManyToOne(() => User, (user) => user.orders)
   user: User;
   
   
}
