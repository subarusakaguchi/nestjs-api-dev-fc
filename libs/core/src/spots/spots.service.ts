import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotDto, eventId: string) {
    const eventExists = await this.prismaService.event.findFirst({
      where: { id: eventId },
    });

    if (!eventExists) throw new Error('Evento não encontrado');

    return this.prismaService.spot.create({
      data: { ...createSpotDto, status: 'available', eventId },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findUnique({
      where: {
        id: spotId,
        eventId,
      },
    });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      data: updateSpotDto,
      where: { eventId, id: spotId },
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spot.delete({ where: { eventId, id: spotId } });
  }
}
