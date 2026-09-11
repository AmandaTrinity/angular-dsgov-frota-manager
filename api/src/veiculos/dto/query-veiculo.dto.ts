import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoCombustivel, StatusVeiculo } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class QueryVeiculoDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Busca por placa ou modelo' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: StatusVeiculo })
  @IsOptional()
  @IsEnum(StatusVeiculo)
  status?: StatusVeiculo;

  @ApiPropertyOptional({ enum: TipoCombustivel })
  @IsOptional()
  @IsEnum(TipoCombustivel)
  tipoCombustivel?: TipoCombustivel;
}
