import { Order } from "src/orders/order.entity";
import { Product } from "src/products/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class OrderProduct{ // cartItem

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;
    
    @ManyToOne(() => Order, (order) => order.orderproducts)
    order: Order;

    @ManyToOne(() => Product, (product) => product.orderproducts)
    product: Product;
}