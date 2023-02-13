import { isEmail, isString, IsOptional, IsEmail, IsString } from "class-validator";

export class UpdateUserDto{
    
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password:string;

    @IsString()
    @IsOptional()
    cpf: string;

    @IsString()
    @IsOptional()
    cep: string;
}