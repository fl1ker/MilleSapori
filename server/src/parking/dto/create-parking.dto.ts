import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateParkingDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  officeId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
