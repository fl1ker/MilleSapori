import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() createOfficeDto: CreateOfficeDto) {
    return this.officeService.update(
      Number(id),
      createOfficeDto.name,
      createOfficeDto.city,
      createOfficeDto.address,
      createOfficeDto.isActive,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officeService.remove(Number(id));
  }
}
