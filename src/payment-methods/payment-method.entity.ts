import { Order } from "src/orders/order.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class PaymentMethod{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    method: string;

    @OneToMany(()=> Order, (order) => order.paymentmethod)
    orders: Order[];
}