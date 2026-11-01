import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRoomBookingDto } from './dto/create-room-booking.dto.js';

@Injectable()
export class RoomBookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomBookingDto: CreateRoomBookingDto, userId: number) {
    const { roomId, startAt, endAt } = createRoomBookingDto;

    const start = new Date(startAt);
    const end = new Date(endAt);

    // Проверка даты
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid start or end date');
    }

    // Конец должен быть позже начала
    if (start >= end) {
      throw new BadRequestException('End time must be later than start time');
    }

    // Проверяем пользователя
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }

    if (!user.isActive) {
      throw new BadRequestException('User is not active');
    }

    // Проверяем комнату
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} does not exist`);
    }

    if (!room.isActive) {
      throw new BadRequestException('Room is not active');
    }

    // Проверяем пересечение бронирований
    const overlappingBooking = await this.prisma.roomBooking.findFirst({
      where: {
        roomId,
        status: 'CONFIRMED',
        startAt: {
          lt: end,
        },
        endAt: {
          gt: start,
        },
      },
    });

    if (overlappingBooking) {
      throw new ConflictException('Room is already booked for this time');
    }

    // Создаём бронирование
    return this.prisma.roomBooking.create({
      data: {
        userId,
        roomId,
        startAt: start,
        endAt: end,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
            capacity: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.roomBooking.findMany({
      orderBy: {
        startAt: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
            capacity: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateRoomBookingDto: CreateRoomBookingDto,
    userId: number,
    role: string,
  ) {
    const booking = await this.prisma.roomBooking.findUnique({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Room booking with id ${id} does not exist`);
    }

    if (booking.userId !== userId && role !== 'ADMIN') {
      throw new ForbiddenException('You can only update your own booking');
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Room booking is already cancelled');
    }

    const { roomId, startAt, endAt } = updateRoomBookingDto;

    if (new Date(startAt) >= new Date(endAt)) {
      throw new BadRequestException('End time must be after start time');
    }

    const overlappingBooking = await this.prisma.roomBooking.findFirst({
      where: {
        id: {
          not: id,
        },
        roomId,
        status: 'CONFIRMED',
        startAt: {
          lt: new Date(endAt),
        },
        endAt: {
          gt: new Date(startAt),
        },
      },
    });

    if (overlappingBooking) {
      throw new BadRequestException('Room is already booked for this time');
    }

    return this.prisma.roomBooking.update({
      where: {
        id,
      },
      data: {
        roomId,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
            capacity: true,
          },
        },
      },
    });
  }
  async remove(id: number, userId: number, role: string) {
    const booking = await this.prisma.roomBooking.findUnique({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Room booking with id ${id} does not exist`);
    }

    if (booking.userId !== userId && role !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own booking');
    }

    return this.prisma.roomBooking.delete({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
            capacity: true,
          },
        },
      },
    });
  }
}
