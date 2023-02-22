import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";

export class OrderDto {

    @Expose()
    id: number;

    @Expose()
    status: string;

    @Transform(({obj})=> obj.user.id)
    @Expose()
    userId: number;

}