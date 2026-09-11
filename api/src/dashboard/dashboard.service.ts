import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardQueryDto } from './dto/dashboard-query.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async resumo(query: DashboardQueryDto) {
    const where: Prisma.AbastecimentoWhereInput = {
      ...((query.dataInicio || query.dataFim) && {
        data: {
          ...(query.dataInicio && { gte: new Date(query.dataInicio) }),
          ...(query.dataFim && { lte: new Date(query.dataFim) }),
        },
      }),
    };

    const [totais, porCombustivel, porUf, porMes] = await Promise.all([
      this.prisma.abastecimento.aggregate({
        where,
        _sum: { valorTotalPago: true, quantidadeLitros: true },
        _count: { _all: true },
        _avg: { valorLitro: true },
      }),
      this.prisma.abastecimento.groupBy({
        by: ['tipoCombustivel'],
        where,
        _sum: { valorTotalPago: true, quantidadeLitros: true },
        orderBy: { _sum: { valorTotalPago: 'desc' } },
      }),
      this.prisma.abastecimento.groupBy({
        by: ['uf'],
        where,
        _sum: { valorTotalPago: true },
        orderBy: { _sum: { valorTotalPago: 'desc' } },
      }),
      this.gastoPorMes(where),
    ]);

    return {
      totalGasto: Number(totais._sum.valorTotalPago ?? 0),
      totalLitros: Number(totais._sum.quantidadeLitros ?? 0),
      totalAbastecimentos: totais._count._all,
      valorMedioPorLitro: Number(totais._avg.valorLitro ?? 0),
      gastoPorCombustivel: porCombustivel.map((item) => ({
        tipoCombustivel: item.tipoCombustivel,
        totalGasto: Number(item._sum.valorTotalPago ?? 0),
        totalLitros: Number(item._sum.quantidadeLitros ?? 0),
      })),
      gastoPorUf: porUf.map((item) => ({
        uf: item.uf,
        totalGasto: Number(item._sum.valorTotalPago ?? 0),
      })),
      gastoPorMes: porMes,
    };
  }

  private async gastoPorMes(where: Prisma.AbastecimentoWhereInput) {
    const abastecimentos = await this.prisma.abastecimento.findMany({
      where,
      select: { data: true, valorTotalPago: true },
    });

    const acumulado = new Map<string, number>();
    for (const item of abastecimentos) {
      const mes = item.data.toISOString().slice(0, 7);
      acumulado.set(
        mes,
        (acumulado.get(mes) ?? 0) + Number(item.valorTotalPago),
      );
    }

    return Array.from(acumulado.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([mes, totalGasto]) => ({ mes, totalGasto }));
  }
}
