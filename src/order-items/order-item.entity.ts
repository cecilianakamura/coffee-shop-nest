import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export class OrderItem{

    @PrimaryGeneratedColumn()
    id: number;

    //quantidade + id produto
}