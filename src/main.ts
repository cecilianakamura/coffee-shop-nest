import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session'); //importação incompativel com tsconfig

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['fg321fgj45f$23']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }),
  );
  await app.listen(3000);
}
bootstrap();
