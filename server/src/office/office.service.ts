import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOfficeDto } from './dto/create-office.dto.js';

@Injectable()
export class OfficeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.office.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async create(createOfficeDto: CreateOfficeDto) {
  return this.prisma.office.create({
    data: {
      name: createOfficeDto.name,
      city: createOfficeDto.city,
      address: createOfficeDto.address,
    },
  });
}

  async update(id: number, createOfficeDto: CreateOfficeDto) {
  return this.prisma.office.update({
    where: {
      id,
    },
    data: {
      name: createOfficeDto.name,
      city: createOfficeDto.city,
      address: createOfficeDto.address,
      isActive: createOfficeDto.isActive,
    },
  });
}

  async remove(id: number) {
  return this.prisma.office.delete({
    where: {
      id,
    },
  });
}
}
