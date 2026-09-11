import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResult } from '../common/dto/pagination-query.dto';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { QueryVeiculoDto } from './dto/query-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateVeiculoDto) {
    return this.prisma.veiculo.create({ data: dto });
  }

  async findAll(query: QueryVeiculoDto): Promise<PaginatedResult<any>> {
    const { page, limit, sortOrder, search, status, tipoCombustivel } = query;

    const where: Prisma.VeiculoWhereInput = {
      status,
      tipoCombustivel,
      ...(search && {
        OR: [
          { placa: { contains: search, mode: 'insensitive' } },
          { modelo: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.veiculo.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: sortOrder },
      }),
      this.prisma.veiculo.count({ where }),
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
    const veiculo = await this.prisma.veiculo.findUnique({ where: { id } });
    if (!veiculo) {
      throw new NotFoundException(`Veículo ${id} não encontrado.`);
    }
    return veiculo;
  }

  async update(id: string, dto: UpdateVeiculoDto) {
    await this.findOne(id);
    return this.prisma.veiculo.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.veiculo.delete({ where: { id } });
  }
}
