import { Category } from "src/categories/category.entity";
import { OrderProduct } from "src/order-product/order-product.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    photo: string;

    @OneToMany(()=> OrderProduct, (orderproduct) => orderproduct.product)
    orderproducts: OrderProduct[];

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
    
}