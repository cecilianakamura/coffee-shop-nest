import { Order } from "src/orders/order.entity";
import { OneToMany, AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    cpf: string;

    @Column()
    cep: string;

    @Column({default: true}) //TO DO mudar default
    admin: boolean;

    @OneToMany(()=> Order, (order) => order.user)
    orders: Order[];

    @AfterInsert()
    logInsert(){
        console.log('Usuário cadastrado com id', this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Usuário atualizado com id', this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('Usuário excluído com id', this.id);
    }
}