import { PrismaClient, TipoCombustivel } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

interface AbastecimentoMock {
  id: number;
  data: string;
  posto: string;
  uf: string;
  tipoCombustivel: string;
  motorista: { nome: string; cpf: string };
  veiculo: { placa: string; modelo: string };
  valorLitro: number;
  quantidadeLitros: number;
  valorTotalPago: number;
}

function normalizeTipoCombustivel(raw: string): TipoCombustivel {
  const key = raw.trim().toUpperCase();
  const map: Record<string, TipoCombustivel> = {
    GASOLINA: 'GASOLINA',
    ETANOL: 'ETANOL',
    ALCOOL: 'ETANOL',
    DIESEL: 'DIESEL',
    GNV: 'GNV',
    ELETRICO: 'ELETRICO',
    ELÉTRICO: 'ELETRICO',
  };
  return map[key] ?? 'GASOLINA';
}

async function main() {
  const dbPath = join(
    __dirname,
    '..',
    '..',
    'public',
    'assets',
    'mocks',
    'db.json',
  );
  const raw = readFileSync(dbPath, 'utf-8');
  const { abastecimentos } = JSON.parse(raw) as {
    abastecimentos: AbastecimentoMock[];
  };

  console.log(
    `Seed: ${abastecimentos.length} abastecimentos encontrados no mock.`,
  );

  for (const item of abastecimentos) {
    const tipoCombustivel = normalizeTipoCombustivel(item.tipoCombustivel);

    const motorista = await prisma.motorista.upsert({
      where: { cpf: item.motorista.cpf },
      update: {},
      create: {
        nome: item.motorista.nome,
        cpf: item.motorista.cpf,
      },
    });

    const veiculo = await prisma.veiculo.upsert({
      where: { placa: item.veiculo.placa },
      update: {},
      create: {
        placa: item.veiculo.placa,
        modelo: item.veiculo.modelo,
        tipoCombustivel,
      },
    });

    await prisma.abastecimento.create({
      data: {
        data: new Date(item.data),
        posto: item.posto,
        uf: item.uf,
        tipoCombustivel,
        valorLitro: item.valorLitro,
        quantidadeLitros: item.quantidadeLitros,
        valorTotalPago: item.valorTotalPago,
        motoristaId: motorista.id,
        veiculoId: veiculo.id,
      },
    });
  }

  console.log('Seed concluído com sucesso.');
}

main()
  .catch((error) => {
    console.error('Erro ao executar o seed:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
