import { Body, Controller, Get, Post } from '@nestjs/common';
import { OfficeService } from './office.service.js';
import { CreateOfficeDto } from './dto/create-office.dto.js';

@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  findAll() {
    return this.officeService.findAll();
  }

  @Post()
  create(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officeService.create(
      createOfficeDto.name,
      createOfficeDto.city,
      createOfficeDto.address,
    );
  }
}
