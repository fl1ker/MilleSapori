import { Module } from '@nestjs/common';
import { ParkingBookingController } from './parking-booking.controller.js';
import { ParkingBookingService } from './parking-booking.service.js';

@Module({
  controllers: [ParkingBookingController],
  providers: [ParkingBookingService]
})
export class ParkingBookingModule {}
