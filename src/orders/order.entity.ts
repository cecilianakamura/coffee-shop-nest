import { OrderProduct } from "src/order-product/order-product.entity";
import { PaymentMethod } from "src/payment-methods/payment-method.entity";
import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Order{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'ativo'})
    status: string;

    // @Column('json', { nullable: true }) //? pode ser nulo
    // address: object;

    @OneToMany(() => OrderProduct, (orderproduct) => orderproduct.order)
    orderproducts: OrderProduct[];

    @ManyToOne(() => PaymentMethod, (paymentmethod) => paymentmethod.orders)
    paymentmethod: PaymentMethod;
    
    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}