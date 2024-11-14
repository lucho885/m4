import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "../products/product.entity";
import { Order } from "../orders/Order.entity";

@Entity({
  name: "ordersDetails",
})
export class OrdersDetail {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  // Relación One-to-One con Order
  @OneToOne(() => Order, order => order.orderDetails)
  order: Order;

  @ManyToMany(() => Product, product => product.orderDetails)
  products: Product[];
}
