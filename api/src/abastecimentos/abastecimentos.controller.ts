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
import { AbastecimentosService } from './abastecimentos.service';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';
import { QueryAbastecimentoDto } from './dto/query-abastecimento.dto';

@ApiTags('abastecimentos')
@Controller('abastecimentos')
export class AbastecimentosController {
  constructor(private readonly abastecimentosService: AbastecimentosService) {}

  @Post()
  create(@Body() dto: CreateAbastecimentoDto) {
    return this.abastecimentosService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryAbastecimentoDto) {
    return this.abastecimentosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.abastecimentosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAbastecimentoDto,
  ) {
    return this.abastecimentosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.abastecimentosService.remove(id);
  }
}
