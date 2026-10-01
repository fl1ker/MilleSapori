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

  async update(id: number, name: string, city: string, address?: string, isActive?: boolean) {
    return this.prisma.office.update({
      where: {
        id,
      },
      data: {
        name,
        city,
        address,
        isActive,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.office.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
