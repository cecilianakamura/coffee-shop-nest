import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateOrderProductDto {

    @IsOptional()
    @IsNumber()
    productId: number;

    @IsOptional()
    @IsNumber()
    quantity: number;
    
}