import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FuelService } from '../../../core/services/fuel.service';
import { Abastecimento } from '../../../core/models/abastecimento.model';

export interface Filtros {
  uf: string | null;
  tipo: string | null;
  dataInicio: string | null;
  dataFim: string | null;
}

@Injectable({ providedIn: 'root' })
export class ConsultaFacade {
  private readonly fuelService = inject(FuelService);
  private readonly PAGE_SIZE = 5; // Itens por página

  // Estado interno em signals
  private readonly filtrosSignal = signal<Partial<Filtros>>({});
  private readonly paginaAtualSignal = signal<number>(1);

  private readonly todosAbastecimentosSignal = toSignal(this.fuelService.getAbastecimentos(), {
    initialValue: [] as Abastecimento[],
  });

  // Derivados em signals
  readonly abastecimentosFiltrados = computed(() =>
    this.aplicarFiltros(this.todosAbastecimentosSignal(), this.filtrosSignal())
  );

  readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.abastecimentosFiltrados().length / this.PAGE_SIZE))
  );

  readonly dadosPaginados = computed(() => {
    const pagina = this.paginaAtualSignal();
    const inicio = (pagina - 1) * this.PAGE_SIZE;
    const fim = inicio + this.PAGE_SIZE;
    return this.abastecimentosFiltrados().slice(inicio, fim);
  });

  // Estado público em signals
  readonly filtros = this.filtrosSignal.asReadonly();
  readonly paginaAtual = this.paginaAtualSignal.asReadonly();

  // Ações públicas para modificar o estado
  public atualizarFiltros(filtros: Partial<Filtros>): void {
    this.filtrosSignal.set(filtros);
    this.mudarPagina(1); // Reseta para a primeira página ao aplicar um filtro
  }

  public mudarPagina(pagina: number): void {
    const paginaNormalizada = Math.min(Math.max(1, pagina), this.totalPaginas());
    this.paginaAtualSignal.set(paginaNormalizada);
  }

  private aplicarFiltros(lista: Abastecimento[], filtros: Partial<Filtros>): Abastecimento[] {
    return lista.filter((item) => {
      const filtroUf = !filtros.uf || item.uf === filtros.uf;
      const filtroTipo = !filtros.tipo || item.tipoCombustivel === filtros.tipo;
      const filtroDataInicio =
        !filtros.dataInicio || new Date(item.data) >= new Date(filtros.dataInicio);
      const filtroDataFim = !filtros.dataFim || new Date(item.data) <= new Date(filtros.dataFim);
      return filtroUf && filtroTipo && filtroDataInicio && filtroDataFim;
    });
  }
}
