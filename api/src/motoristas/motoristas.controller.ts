import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MotoristasService } from './motoristas.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { QueryMotoristaDto } from './dto/query-motorista.dto';

@ApiTags('motoristas')
@Controller('motoristas')
export class MotoristasController {
  constructor(private readonly motoristasService: MotoristasService) {}

  @Post()
  create(@Body() dto: CreateMotoristaDto) {
    return this.motoristasService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryMotoristaDto) {
    return this.motoristasService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.motoristasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMotoristaDto,
  ) {
    return this.motoristasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.motoristasService.remove(id);
  }
}
