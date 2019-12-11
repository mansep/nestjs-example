import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Config from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Nest Example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('example')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.port);
}
bootstrap();
