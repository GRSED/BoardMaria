import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticesController } from './notices/notices.controller';
import { NoticesService } from './notices/notices.service';
import { NoticesModule } from './notices/notices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    NoticesModule,
    TypeOrmModule.forRoot(),
    // ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'apidoc') }),
  ],
  controllers: [
    AppController,
    NoticesController,
  ],
  providers: [
    AppService,
    NoticesService,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
