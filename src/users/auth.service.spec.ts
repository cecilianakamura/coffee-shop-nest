import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

it('can create an instance of auth service', async () => {
  //Cópia de UsersService
  const fakeUsersService: Partial<UsersService> = { //partial tira obrigatoriedade de definir todos os métodos
    find: () => Promise.resolve([]),
    create: (
      name: string,
      email: string,
      password: string,
      cpf: string,
      cep: string,
    ) => Promise.resolve({ id: 1, name, email, password, cpf, cep } as User),
  };

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUsersService,
      },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
