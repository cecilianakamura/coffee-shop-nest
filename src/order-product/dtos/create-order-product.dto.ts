import { IsNumber, IsString } from "class-validator";

export class CreateOrderProductDto {

    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
    
}