import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3456

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`App compiled succsessfully. Listen: http://localhost:${PORT}`)
}
bootstrap();
