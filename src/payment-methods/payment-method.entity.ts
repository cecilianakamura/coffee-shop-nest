import { Order } from "src/orders/order.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


// export enum Method{
//     CREDIT = 'credit',
//     DEBIT = 'debit',
//     CASH = 'cash',
//     PIX = 'pix',
//     CONTACTLESS = 'contactless'
// }

@Entity()
export class PaymentMethod{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()//({type: 'enum', enum: Method, default: Method.DEBIT})
    method: string;

    @OneToMany(()=> Order, (order) => order.paymentmethod)
    orders: Order[];
}