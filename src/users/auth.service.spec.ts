import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  //Cópia de UsersService
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (
      name: string,
      email: string,
      password: string,
      cpf: string,
      cep: string,
    ) => Promise.resolve({ id: 1, name, email, password, cpf, cep }),
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
