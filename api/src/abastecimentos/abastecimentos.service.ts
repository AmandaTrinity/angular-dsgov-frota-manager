import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResult } from '../common/dto/pagination-query.dto';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';
import { QueryAbastecimentoDto } from './dto/query-abastecimento.dto';

const ABASTECIMENTO_INCLUDE = {
  motorista: { select: { id: true, nome: true, cpf: true } },
  veiculo: { select: { id: true, placa: true, modelo: true } },
} satisfies Prisma.AbastecimentoInclude;

@Injectable()
export class AbastecimentosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAbastecimentoDto) {
    const valorTotalPago = Number(
      (dto.valorLitro * dto.quantidadeLitros).toFixed(2),
    );

    return this.prisma.abastecimento.create({
      data: {
        data: new Date(dto.data),
        posto: dto.posto,
        uf: dto.uf,
        tipoCombustivel: dto.tipoCombustivel,
        valorLitro: dto.valorLitro,
        quantidadeLitros: dto.quantidadeLitros,
        valorTotalPago,
        motoristaId: dto.motoristaId,
        veiculoId: dto.veiculoId,
      },
      include: ABASTECIMENTO_INCLUDE,
    });
  }

  async findAll(query: QueryAbastecimentoDto): Promise<PaginatedResult<any>> {
    const {
      page,
      limit,
      sortOrder,
      sortBy,
      uf,
      tipoCombustivel,
      motoristaId,
      veiculoId,
      dataInicio,
      dataFim,
    } = query;

    const where: Prisma.AbastecimentoWhereInput = {
      uf,
      tipoCombustivel,
      motoristaId,
      veiculoId,
      ...((dataInicio || dataFim) && {
        data: {
          ...(dataInicio && { gte: new Date(dataInicio) }),
          ...(dataFim && { lte: new Date(dataFim) }),
        },
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.abastecimento.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: ABASTECIMENTO_INCLUDE,
      }),
      this.prisma.abastecimento.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async findOne(id: string) {
    const abastecimento = await this.prisma.abastecimento.findUnique({
      where: { id },
      include: ABASTECIMENTO_INCLUDE,
    });
    if (!abastecimento) {
      throw new NotFoundException(`Abastecimento ${id} não encontrado.`);
    }
    return abastecimento;
  }

  async update(id: string, dto: UpdateAbastecimentoDto) {
    const atual = await this.findOne(id);

    const valorLitro = dto.valorLitro ?? Number(atual.valorLitro);
    const quantidadeLitros =
      dto.quantidadeLitros ?? Number(atual.quantidadeLitros);
    const valorTotalPago = Number((valorLitro * quantidadeLitros).toFixed(2));

    return this.prisma.abastecimento.update({
      where: { id },
      data: {
        ...(dto.data && { data: new Date(dto.data) }),
        ...(dto.posto && { posto: dto.posto }),
        ...(dto.uf && { uf: dto.uf }),
        ...(dto.tipoCombustivel && { tipoCombustivel: dto.tipoCombustivel }),
        ...(dto.motoristaId && { motoristaId: dto.motoristaId }),
        ...(dto.veiculoId && { veiculoId: dto.veiculoId }),
        valorLitro,
        quantidadeLitros,
        valorTotalPago,
      },
      include: ABASTECIMENTO_INCLUDE,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.abastecimento.delete({ where: { id } });
  }
}
