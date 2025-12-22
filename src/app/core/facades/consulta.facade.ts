import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FuelService } from '../services/fuel.service';
import { Abastecimento } from '../models/abastecimento.model';

export interface Filtros {
  uf: string | null;
  tipo: string | null;
  dataInicio: string | null;
  dataFim: string | null;
}

@Injectable({ providedIn: 'root' })
export class ConsultaFacade {
  private readonly PAGE_SIZE = 5; // Itens por página

  // Subjects para gerenciar o estado
  private filtrosSubject = new BehaviorSubject<Partial<Filtros>>({});
  private paginaAtualSubject = new BehaviorSubject<number>(1);

  // Observables públicos (o estado da página) ---
  public filtros$ = this.filtrosSubject.asObservable();
  public paginaAtual$ = this.paginaAtualSubject.asObservable();

  public abastecimentosFiltrados$: Observable<Abastecimento[]>;
  public dadosPaginados$: Observable<Abastecimento[]>;
  public totalPaginas$: Observable<number>;

  constructor(private fuelService: FuelService) {
    const todosAbastecimentos$ = this.fuelService.getAbastecimentos().pipe(
      shareReplay(1) // Cacheia a última emissão para evitar múltiplas chamadas HTTP
    );

    this.abastecimentosFiltrados$ = combineLatest([
      todosAbastecimentos$,
      this.filtros$
    ]).pipe(
      map(([lista, filtros]) => this.aplicarFiltros(lista, filtros)),
      shareReplay(1)
    );

    this.dadosPaginados$ = combineLatest([
      this.abastecimentosFiltrados$,
      this.paginaAtual$
    ]).pipe(
      map(([lista, pagina]) => {
        const inicio = (pagina - 1) * this.PAGE_SIZE;
        const fim = inicio + this.PAGE_SIZE;
        return lista.slice(inicio, fim);
      })
    );

    this.totalPaginas$ = this.abastecimentosFiltrados$.pipe(
      map(lista => Math.ceil(lista.length / this.PAGE_SIZE) || 1)
    );
  }

  // Ações públicas para modificar o estado
  public atualizarFiltros(filtros: Partial<Filtros>): void {
    this.filtrosSubject.next(filtros);
    this.mudarPagina(1); // Reseta para a primeira página ao aplicar um filtro
  }

  public mudarPagina(pagina: number): void {
    this.paginaAtualSubject.next(pagina);
  }

  private aplicarFiltros(lista: Abastecimento[], filtros: Partial<Filtros>): Abastecimento[] {
    return lista.filter(item => {
      const filtroUf = !filtros.uf || item.uf === filtros.uf;
      const filtroTipo = !filtros.tipo || item.tipoCombustivel === filtros.tipo;
      const filtroDataInicio = !filtros.dataInicio || new Date(item.data) >= new Date(filtros.dataInicio);
      const filtroDataFim = !filtros.dataFim || new Date(item.data) <= new Date(filtros.dataFim);
      return filtroUf && filtroTipo && filtroDataInicio && filtroDataFim;
    });
  }
}