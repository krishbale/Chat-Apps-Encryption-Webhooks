import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Middleware setup
    app.use(compression());

    // Global pipes setup
    // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    // CORS setup
    // const corsOptions: CorsOptions = {
    //   origin: '*',
    //   methods: '*',
    //   credentials: true,
    //   optionsSuccessStatus: 204,
    // };
    // app.enableCors(corsOptions);

    const defaultPort = 4200;
    await app.listen(defaultPort);
    console.log('Server is running on http://0.0.0.0:' + defaultPort);
  } catch (err) {
    console.error('Error starting Nest application:', err);
  }
}

bootstrap();
