import { isEmail, isString, IsOptional, IsEmail, IsString } from "class-validator";

export class UpdateUserDto{
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password:string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    cpf: string;

    @IsString()
    @IsOptional()
    cep: string;
}