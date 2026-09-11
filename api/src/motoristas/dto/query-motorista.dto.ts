import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusMotorista } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class QueryMotoristaDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Busca por nome ou CPF' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: StatusMotorista })
  @IsOptional()
  @IsEnum(StatusMotorista)
  status?: StatusMotorista;
}
