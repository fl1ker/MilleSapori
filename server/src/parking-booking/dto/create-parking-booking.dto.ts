import {
  IsDateString,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateParkingBookingDto {
  @IsInt()
  @IsNotEmpty()
  parkingSpaceId: number;

  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  @IsDateString()
  @IsNotEmpty()
  endAt: string;
}