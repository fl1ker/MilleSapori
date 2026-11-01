import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { RoomBookingService } from './room-booking.service.js';
import { CreateRoomBookingDto } from './dto/create-room-booking.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('room-booking')
export class RoomBookingController {
  constructor(private readonly roomBookingService: RoomBookingService) {}

  @Post()
  create(@Req() req: any, @Body() createRoomBookingDto: CreateRoomBookingDto) {
    return this.roomBookingService.create(createRoomBookingDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.roomBookingService.findAll();
  }

  @Put(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateRoomBookingDto: CreateRoomBookingDto,
  ) {
    return this.roomBookingService.update(
      Number(id),
      updateRoomBookingDto,
      req.user.id,
      req.user.role,
    );
  }
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.roomBookingService.remove(
      Number(id),
      req.user.id,
      req.user.role,
    );
  }
}
