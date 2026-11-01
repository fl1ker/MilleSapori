import { Module } from '@nestjs/common';
import { RoomBookingController } from './room-booking.controller.js';
import { RoomBookingService } from './room-booking.service.js';

@Module({
  controllers: [RoomBookingController],
  providers: [RoomBookingService]
})
export class RoomBookingModule {}
