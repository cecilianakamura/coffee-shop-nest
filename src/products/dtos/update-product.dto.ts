import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsString()
    photo: string;

}