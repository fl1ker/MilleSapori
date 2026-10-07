import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  officeId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
