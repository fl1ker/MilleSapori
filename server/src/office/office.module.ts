import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller.js';
import { OfficeService } from './office.service.js';

@Module({
  controllers: [OfficeController],
  providers: [OfficeService]
})
export class OfficeModule {}
