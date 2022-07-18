import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserGuard } from './guards/user.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new UserGuard());
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
