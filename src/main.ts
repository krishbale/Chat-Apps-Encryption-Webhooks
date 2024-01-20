import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  const config = new DocumentBuilder()
  .setTitle('Chat Application')
  .setDescription('The Api for chat applicaton')
  .setVersion('1.0')
  .addTag('chat')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(5000);
}
bootstrap();
