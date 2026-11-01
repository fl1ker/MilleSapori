import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateParkingDto } from './dto/create-parking.dto.js';

@Injectable()
export class ParkingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParkingDto: CreateParkingDto) {
    return this.prisma.parkingSpace.create({
      data: {
        number: createParkingDto.number,
        description: createParkingDto.description,
        officeId: createParkingDto.officeId,
      },
    });
  }

  async findAll() {
    return this.prisma.parkingSpace.findMany({
      orderBy: {
        number: 'asc',
      },
    });
  }

  async update(id: number, createParkingDto: CreateParkingDto) {
    return this.prisma.parkingSpace.update({
      where: {
        id,
      },
      data: {
        number: createParkingDto.number,
        description: createParkingDto.description,
        officeId: createParkingDto.officeId,
        isActive: createParkingDto.isActive,
      },
    });
  }
  async remove(id: number) {
    return this.prisma.parkingSpace.delete({
      where: {
        id,
      },
    });
  }
}
