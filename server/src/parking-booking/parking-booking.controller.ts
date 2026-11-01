import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ParkingBookingService } from './parking-booking.service.js';
import { CreateParkingBookingDto } from './dto/create-parking-booking.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('parking-booking')
export class ParkingBookingController {
  constructor(private readonly parkingBookingService: ParkingBookingService) {}

  @Post()
  create(
    @Req() req: any,
    @Body() createParkingBookingDto: CreateParkingBookingDto,
  ) {
    return this.parkingBookingService.create(
      createParkingBookingDto,
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.parkingBookingService.findAll();
  }

  @Put(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateParkingBookingDto: CreateParkingBookingDto,
  ) {
    return this.parkingBookingService.update(
      Number(id),
      updateParkingBookingDto,
      req.user.id,
      req.user.role,
    );
  }
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.parkingBookingService.remove(
      Number(id),
      req.user.id,
      req.user.role,
    );
  }
}
