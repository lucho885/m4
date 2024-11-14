import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { timeGlobal } from './middlewares/timeGlobal.middleware';
import { ValidationPipe } from '@nestjs/common';
import "reflect-metadata";
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(timeGlobal)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true,  // Lanza error si propiedades no válidas están presentes
    transform: true,  // Transforma los tipos de datos automáticamente
  }));
  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  const productSeed = app.get(ProductsSeed);
  await productSeed.seed();
  const swaggerConfig = new DocumentBuilder()
                              .setTitle("Proyecto M4")
                              .setDescription("Este es el proyecto del modulo 4 de la carrera backend dev de soy de henry")
                              .setVersion("1.0")
                              .addBearerAuth()
                              .build();
  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup("api",app,document);                         
  await app.listen(3000);
}
bootstrap();
