import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRoomDto } from './dto/create-room.dto.js';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: {
        name: createRoomDto.name,
        description: createRoomDto.description,
        capacity: createRoomDto.capacity,
        officeId: createRoomDto.officeId,
      },
    });
  }

  async findAll() {
    return this.prisma.room.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async update(id: number, createRoomDto: CreateRoomDto) {
    return this.prisma.room.update({
      where: {
        id,
      },
      data: {
        name: createRoomDto.name,
        description: createRoomDto.description,
        capacity: createRoomDto.capacity,
        officeId: createRoomDto.officeId,
        isActive: createRoomDto.isActive,
      },
    });
  }
  async remove(id: number) {
    return this.prisma.room.delete({
      where: {
        id,
      },
    });
  }
}
