import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = 3456

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const res = []
      for (let i = 0; i < errors.length; i++) {
        res.push({
          field: errors[i].property,
          message: getFirstMessage(errors[i].constraints)
        })
      }
      return new BadRequestException(res)
    }
  }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Kurnik API')
    .setVersion('1.0')
    .build()
  const docs = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/swagger', app, docs)
  await app.listen(PORT);
  console.log(`App compiled succsessfully. Listen: http://localhost:${PORT}`)
}
bootstrap();

function getFirstMessage (messages: Record<string, string>): string {
  for (const key in messages) {
    return messages[key]
  }
}
