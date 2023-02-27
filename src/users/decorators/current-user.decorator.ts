import{
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

//Session Object + UsersService Instance
export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)