import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { SpotsService } from '@app/core/spots/spots.service';
import { CriarLugarRequest } from './request/criar-lugar.request';
import { AtualizarLugarRequest } from './request/atulizar-lugar.request';

@Controller('eventos/:eventoId/lugares')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Param('eventoId') eventoId: string,
    @Body() criarLugarRequest: CriarLugarRequest,
  ) {
    return this.spotsService.create({ name: criarLugarRequest.nome }, eventoId);
  }

  @Get()
  findAll(@Param('eventoId') eventoId: string) {
    return this.spotsService.findAll(eventoId);
  }

  @Get(':lugaresId')
  findOne(
    @Param('eventoId') eventoId: string,
    @Param('lugaresId') lugaresId: string,
  ) {
    return this.spotsService.findOne(eventoId, lugaresId);
  }

  @Patch(':lugaresId')
  update(
    @Param('eventoId') eventoId: string,
    @Param('lugaresId') lugaresId: string,
    @Body() atualizarLugarRequest: AtualizarLugarRequest,
  ) {
    return this.spotsService.update(eventoId, lugaresId, {
      name: atualizarLugarRequest.nome,
    });
  }

  @HttpCode(204)
  @Delete(':lugaresId')
  remove(
    @Param('eventoId') eventoId: string,
    @Param('lugaresId') lugaresId: string,
  ) {
    return this.spotsService.remove(eventoId, lugaresId);
  }
}
