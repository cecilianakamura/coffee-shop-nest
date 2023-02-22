import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto{
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    photo: string;


}