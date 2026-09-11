import { ApiProperty } from '@nestjs/swagger';
import { TipoCombustivel } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateAbastecimentoDto {
  @ApiProperty({ example: '2026-03-01' })
  @IsDateString()
  data: string;

  @ApiProperty({ example: 'Posto Alvorada' })
  @IsString()
  posto: string;

  @ApiProperty({ example: 'SP', description: 'Sigla da UF (2 letras)' })
  @IsString()
  @Length(2, 2)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  uf: string;

  @ApiProperty({ enum: TipoCombustivel, example: TipoCombustivel.GASOLINA })
  @IsEnum(TipoCombustivel)
  tipoCombustivel: TipoCombustivel;

  @ApiProperty({ example: 5.59, description: 'Preço por litro em R$' })
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  valorLitro: number;

  @ApiProperty({ example: 45, description: 'Quantidade de litros abastecidos' })
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  quantidadeLitros: number;

  @ApiProperty({ example: 'a3c1f6b0-...' })
  @IsUUID()
  motoristaId: string;

  @ApiProperty({ example: 'b7d2e8a1-...' })
  @IsUUID()
  veiculoId: string;
}
