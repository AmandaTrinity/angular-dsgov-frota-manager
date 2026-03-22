import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, retry, shareReplay, tap } from 'rxjs';
import { FuelService } from '../../../core/services/fuel.service';
import { Abastecimento } from '../../../core/models/abastecimento.model';

// Define a lista fixa de UFs qpara monitoramento
const LISTA_UFS = ['SP', 'RJ', 'MG', 'PR', 'RS', 'BA', 'SC', 'GO', 'PE', 'CE'];

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private readonly fuelService = inject(FuelService);

  private readonly loadingSignal = signal(true);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private readonly abastecimentosRequest$ = this.fuelService.getAbastecimentos().pipe(
    map((response: Abastecimento[] | { abastecimentos?: Abastecimento[] }) => {
      if (Array.isArray(response)) {
        return response;
      }

      return response?.abastecimentos ?? [];
    }),
    tap({
    next: () => {
        this.errorSignal.set(null);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('Aguardando API de mock.');
        this.loadingSignal.set(true);
      },
    }),
    shareReplay(1)
  );

  readonly abastecimentos = toSignal(this.abastecimentosRequest$, {
    initialValue: [] as Abastecimento[],
  });

  // KPIs/Gráficos em Signals (estado de apresentação pronto para o componente)
  readonly precoMedioGasolina = computed(() => {
    const gasolinaLista = this.abastecimentos().filter(
      (item) => item.tipoCombustivel === 'Gasolina'
    );
    if (gasolinaLista.length === 0) return 0;
    const soma = gasolinaLista.reduce((acc, curr) => acc + curr.valorLitro, 0);
    return soma / gasolinaLista.length;
  });

  readonly precoMedioDiesel = computed(() => {
    const dieselLista = this.abastecimentos().filter((item) => item.tipoCombustivel === 'Diesel');
    if (dieselLista.length === 0) return 0;
    const soma = dieselLista.reduce((acc, curr) => acc + curr.valorLitro, 0);
    return soma / dieselLista.length;
  });

  readonly totalLitros = computed(() =>
    this.abastecimentos().reduce((acc, curr) => acc + curr.quantidadeLitros, 0)
  );

  readonly totalPostos = computed(
    () => new Set(this.abastecimentos().map((item) => item.posto)).size
  );

  readonly consumoPorEstado = computed<{ name: string; value: number }[]>(() => {
    const dadosIniciais = LISTA_UFS.reduce(
      (acc, uf) => ({ ...acc, [uf]: 0 }),
      {} as { [key: string]: number }
    );

    const agrupado = this.abastecimentos().reduce((acc: { [key: string]: number }, curr) => {
      if (acc[curr.uf] !== undefined) {
        acc[curr.uf] += curr.quantidadeLitros;
      }
      return acc;
    }, dadosIniciais);

    return Object.keys(agrupado)
      .map((uf) => ({
        name: uf,
        value: agrupado[uf],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  });

  readonly evolucaoPrecos = computed<{ name: string; series: { name: string; value: number }[] }[]>(
    () => {
      const tipos = ['Gasolina', 'Diesel', 'Etanol'];
      return tipos.map((tipo) => ({
        name: tipo,
        series: this.getMediaMensal(this.abastecimentos(), tipo),
      }));
    }
  );

  private getMediaMensal(lista: Abastecimento[], tipo: string): { name: string; value: number }[] {
    const mesesAbreviados = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const dadosMensais: { [key: number]: { soma: number; count: number } } = {};

    lista
      .filter((item) => item.tipoCombustivel === tipo)
      .forEach((item) => {
        const mes = new Date(item.data).getMonth(); // 0 = Janeiro, 11 = Dezembro
        if (!dadosMensais[mes]) {
          dadosMensais[mes] = { soma: 0, count: 0 };
        }
        dadosMensais[mes].soma += item.valorLitro;
        dadosMensais[mes].count++;
      });

    return Object.keys(dadosMensais)
      .map((mesStr) => {
        const mesIndex = parseInt(mesStr, 10);
        const media = dadosMensais[mesIndex].soma / dadosMensais[mesIndex].count;
        return { name: mesesAbreviados[mesIndex], value: media };
      })
      .sort((a, b) => mesesAbreviados.indexOf(a.name) - mesesAbreviados.indexOf(b.name)); // Ordena por mês
  }
}
