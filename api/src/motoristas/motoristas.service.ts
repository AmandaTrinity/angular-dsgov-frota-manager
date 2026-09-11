import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResult } from '../common/dto/pagination-query.dto';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { QueryMotoristaDto } from './dto/query-motorista.dto';

@Injectable()
export class MotoristasService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMotoristaDto) {
    return this.prisma.motorista.create({ data: dto });
  }

  async findAll(query: QueryMotoristaDto): Promise<PaginatedResult<any>> {
    const { page, limit, sortOrder, search, status } = query;

    const where: Prisma.MotoristaWhereInput = {
      status,
      ...(search && {
        OR: [
          { nome: { contains: search, mode: 'insensitive' } },
          { cpf: { contains: search.replace(/\D/g, '') } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.motorista.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: sortOrder },
      }),
      this.prisma.motorista.count({ where }),
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
    const motorista = await this.prisma.motorista.findUnique({ where: { id } });
    if (!motorista) {
      throw new NotFoundException(`Motorista ${id} não encontrado.`);
    }
    return motorista;
  }

  async update(id: string, dto: UpdateMotoristaDto) {
    await this.findOne(id);
    return this.prisma.motorista.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.motorista.delete({ where: { id } });
  }
}
