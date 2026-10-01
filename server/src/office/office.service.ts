import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

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

  async create(name: string, city: string, address?: string) {
  return this.prisma.office.create({
    data: {
      name,
      city,
      address,
    },
  });
}
}
