import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateParkingBookingDto } from './dto/create-parking-booking.dto.js';

@Injectable()
export class ParkingBookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createParkingBookingDto: CreateParkingBookingDto,
    userId: number,
  ) {
    const { parkingSpaceId, startAt, endAt } = createParkingBookingDto;

    const start = new Date(startAt);
    const end = new Date(endAt);

    if (start >= end) {
      throw new BadRequestException('End time must be later than start time');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exist`);
    }

    const parkingSpace = await this.prisma.parkingSpace.findUnique({
      where: {
        id: parkingSpaceId,
      },
    });

    if (!parkingSpace) {
      throw new BadRequestException(
        `Parking space with id ${parkingSpaceId} does not exist`,
      );
    }

    const overlappingBooking = await this.prisma.parkingBooking.findFirst({
      where: {
        parkingSpaceId,
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
      throw new ConflictException(
        'Parking space is already booked for this time',
      );
    }

    return this.prisma.parkingBooking.create({
      data: {
        userId,
        parkingSpaceId,
        startAt: start,
        endAt: end,
      },
    });
  }

  async findAll() {
    return this.prisma.parkingBooking.findMany({
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
        parkingSpace: {
          select: {
            id: true,
            number: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateParkingBookingDto: CreateParkingBookingDto,
    userId: number,
    role: string,
  ) {
    const booking = await this.prisma.parkingBooking.findUnique({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new NotFoundException(
        `Parking booking with id ${id} does not exist`,
      );
    }

    if (booking.userId !== userId && role !== 'ADMIN') {
      throw new ForbiddenException('You can only update your own booking');
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Parking booking is already cancelled');
    }

    const { parkingSpaceId, startAt, endAt } = updateParkingBookingDto;

    if (new Date(startAt) >= new Date(endAt)) {
      throw new BadRequestException('End time must be after start time');
    }

    const overlappingBooking = await this.prisma.parkingBooking.findFirst({
      where: {
        id: {
          not: id,
        },
        parkingSpaceId,
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
      throw new BadRequestException(
        'Parking space is already booked for this time',
      );
    }

    return this.prisma.parkingBooking.update({
      where: {
        id,
      },
      data: {
        parkingSpaceId,
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
        parkingSpace: {
          select: {
            id: true,
            number: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: number, role: string) {
    const booking = await this.prisma.parkingBooking.findUnique({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new NotFoundException(
        `Parking booking with id ${id} does not exist`,
      );
    }

    if (booking.userId !== userId && role !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own booking');
    }

    return this.prisma.parkingBooking.delete({
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
        parkingSpace: {
          select: {
            id: true,
            number: true,
          },
        },
      },
    });
  }
}
