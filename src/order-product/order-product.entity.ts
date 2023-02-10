import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export class OrderProduct{

    @PrimaryGeneratedColumn()
    id: number;

    //quantidade + id produto
}