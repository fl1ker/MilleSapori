import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParkingService } from './parking.service.js';
import { CreateParkingDto } from './dto/create-parking.dto.js';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.create(createParkingDto);
  }

  @Get()
  findAll() {
    return this.parkingService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.update(Number(id), createParkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingService.remove(Number(id));
  }
}
