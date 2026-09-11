-- CreateEnum
CREATE TYPE "TipoCombustivel" AS ENUM ('GASOLINA', 'ETANOL', 'DIESEL', 'GNV', 'ELETRICO');

-- CreateEnum
CREATE TYPE "StatusVeiculo" AS ENUM ('ATIVO', 'MANUTENCAO', 'INATIVO');

-- CreateEnum
CREATE TYPE "StatusMotorista" AS ENUM ('ATIVO', 'INATIVO');

-- CreateTable
CREATE TABLE "veiculos" (
    "id" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT,
    "anoFabricacao" INTEGER,
    "tipoCombustivel" "TipoCombustivel" NOT NULL,
    "status" "StatusVeiculo" NOT NULL DEFAULT 'ATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motoristas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cnh" TEXT,
    "status" "StatusMotorista" NOT NULL DEFAULT 'ATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "motoristas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abastecimentos" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "posto" TEXT NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "tipoCombustivel" "TipoCombustivel" NOT NULL,
    "valorLitro" DECIMAL(10,3) NOT NULL,
    "quantidadeLitros" DECIMAL(10,3) NOT NULL,
    "valorTotalPago" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "motoristaId" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,

    CONSTRAINT "abastecimentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_placa_key" ON "veiculos"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "motoristas_cpf_key" ON "motoristas"("cpf");

-- CreateIndex
CREATE INDEX "abastecimentos_motoristaId_idx" ON "abastecimentos"("motoristaId");

-- CreateIndex
CREATE INDEX "abastecimentos_veiculoId_idx" ON "abastecimentos"("veiculoId");

-- CreateIndex
CREATE INDEX "abastecimentos_data_idx" ON "abastecimentos"("data");

-- AddForeignKey
ALTER TABLE "abastecimentos" ADD CONSTRAINT "abastecimentos_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "motoristas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abastecimentos" ADD CONSTRAINT "abastecimentos_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
