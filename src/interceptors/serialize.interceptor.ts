import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass, plainToInstance } from "class-transformer";

interface ClassConstructor{
    new (... args: any[]): {}
}

//custom decorator - conversão de objetos: plain to class (model para instâncias)
export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor { 
    constructor(private dto: any){}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        
        return handler.handle().pipe(
            map((data:any) =>{
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            }),
        )
    }
}