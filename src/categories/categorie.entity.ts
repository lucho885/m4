import { Product } from '../products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from "uuid";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}