import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoCombustivel, StatusVeiculo } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

const PLACA_REGEX = /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/;

export class CreateVeiculoDto {
  @ApiProperty({
    example: 'ABC-1234',
    description: 'Placa no padrão antigo ou Mercosul',
  })
  @IsString()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase().trim() : value,
  )
  @Matches(PLACA_REGEX, {
    message: 'Placa em formato inválido (ex: ABC-1234 ou ABC1D23)',
  })
  placa: string;

  @ApiProperty({ example: 'Fiat Uno' })
  @IsString()
  modelo: string;

  @ApiPropertyOptional({ example: 'Fiat' })
  @IsOptional()
  @IsString()
  marca?: string;

  @ApiPropertyOptional({ example: 2020 })
  @IsOptional()
  @IsInt()
  @Min(1950)
  @Max(new Date().getFullYear() + 1)
  anoFabricacao?: number;

  @ApiProperty({ enum: TipoCombustivel, example: TipoCombustivel.GASOLINA })
  @IsEnum(TipoCombustivel)
  tipoCombustivel: TipoCombustivel;

  @ApiPropertyOptional({ enum: StatusVeiculo, default: StatusVeiculo.ATIVO })
  @IsOptional()
  @IsEnum(StatusVeiculo)
  status?: StatusVeiculo;
}
