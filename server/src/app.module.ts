import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { OfficeModule } from './office/office.module.js';
import { RoomModule } from './room/room.module.js';
import { ParkingModule } from './parking/parking.module.js'
import { UserModule } from './user/user.module.js';
import { ParkingBookingModule } from './parking-booking/parking-booking.module.js';
import { RoomBookingService } from './room-booking/room-booking.service.js';
import { RoomBookingModule } from './room-booking/room-booking.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [PrismaModule, OfficeModule, RoomModule, ParkingModule, UserModule, ParkingBookingModule, RoomBookingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, RoomBookingService],
})
export class AppModule {}
