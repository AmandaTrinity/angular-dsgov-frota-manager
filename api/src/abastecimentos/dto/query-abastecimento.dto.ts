import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoCombustivel } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class QueryAbastecimentoDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Sigla da UF' })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  uf?: string;

  @ApiPropertyOptional({ enum: TipoCombustivel })
  @IsOptional()
  @IsEnum(TipoCombustivel)
  tipoCombustivel?: TipoCombustivel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  motoristaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  veiculoId?: string;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsDateString()
  dataFim?: string;

  @ApiPropertyOptional({
    enum: ['data', 'valorTotalPago', 'createdAt'],
    default: 'data',
  })
  @IsOptional()
  @IsIn(['data', 'valorTotalPago', 'createdAt'])
  sortBy: 'data' | 'valorTotalPago' | 'createdAt' = 'data';
}
