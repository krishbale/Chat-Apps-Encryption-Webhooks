import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: '*',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
