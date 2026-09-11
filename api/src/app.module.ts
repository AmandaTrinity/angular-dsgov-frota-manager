import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { MotoristasModule } from './motoristas/motoristas.module';
import { AbastecimentosModule } from './abastecimentos/abastecimentos.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    VeiculosModule,
    MotoristasModule,
    AbastecimentosModule,
    DashboardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
