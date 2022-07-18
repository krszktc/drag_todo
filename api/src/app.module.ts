import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoModule } from './to-do-board/to-do.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ToDoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
