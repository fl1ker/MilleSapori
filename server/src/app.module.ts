import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { OfficeModule } from './office/office.module.js';

@Module({
  imports: [PrismaModule, OfficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
