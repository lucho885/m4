import { Order } from '../orders/Order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from "uuid";

@Entity({
  name: "users"
})

export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  
  @Column({ type: 'varchar', nullable: false })
  password: string;


  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ default: 'user' })
  role: string;

  // Relación OneToMany con Order, usando "orders_id" como nombre del campo
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

}
