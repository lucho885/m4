import { Category } from '../categories/categorie.entity';
import { OrdersDetail } from '../ordersDetails/OrderDetails.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from "uuid";

@Entity({
  name: "products"
})
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

 
  @Column({ type: "int", nullable: false })
  stock: number;

  @Column({
    type: 'varchar',
    nullable: true,
    default: 'https://example.com/default-image.png',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrdersDetail, orderDetail => orderDetail.products)
  @JoinTable()  // Este decorador es necesario en una de las entidades
  orderDetails: OrdersDetail[];
}
  