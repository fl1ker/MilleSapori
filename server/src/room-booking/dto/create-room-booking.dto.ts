import {
  IsDateString,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateRoomBookingDto {

  @IsInt()
  @IsNotEmpty()
  roomId: number;

  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  @IsDateString()
  @IsNotEmpty()
  endAt: string;
}