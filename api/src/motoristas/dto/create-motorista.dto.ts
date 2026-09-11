import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusMotorista } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { IsCpf } from '../../common/validators/is-cpf.validator';

export class CreateMotoristaDto {
  @ApiProperty({ example: 'Amanda Trinity' })
  @IsString()
  @MinLength(3)
  nome: string;

  @ApiProperty({ example: '11122233344', description: 'Somente dígitos' })
  @IsString()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : value,
  )
  @IsCpf()
  cpf: string;

  @ApiPropertyOptional({ example: 'AB' })
  @IsOptional()
  @IsString()
  @Length(2, 20)
  cnh?: string;

  @ApiPropertyOptional({
    enum: StatusMotorista,
    default: StatusMotorista.ATIVO,
  })
  @IsOptional()
  @IsEnum(StatusMotorista)
  status?: StatusMotorista;
}
