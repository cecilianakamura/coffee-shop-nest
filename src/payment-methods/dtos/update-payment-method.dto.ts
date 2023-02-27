import { IsOptional, IsString } from "class-validator";

export class UpdatePaymentMethodDto {

    @IsString()
    @IsOptional()
    method: string;
}