import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';
import { ConsultaFacade } from '../../core/facades/consulta.facade';

// Define um tipo para os valores do formulário
interface FiltrosForm {
  uf: string | null;
  tipo: string | null;
  dataInicio: string | null;
  dataFim: string | null;
}

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent implements OnInit, OnDestroy {
  // Estado para Filtragem
  filterForm: FormGroup;
  ufs = ['SP', 'RJ', 'MG', 'PR', 'RS', 'BA', 'SC', 'GO', 'PE', 'CE', 'AM'];

  // Estado para Exibição de Dados e Paginação
  abastecimentosExibidos$: Observable<any[]>;
  totalResultados$: Observable<number>;
  paginaAtual$: Observable<number>;
  totalPaginas$: Observable<number>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private consultaFacade: ConsultaFacade
  ) {
    this.filterForm = this.fb.group({
      uf: [''],
      tipo: [''],
      dataInicio: [''],
      dataFim: [''],
    });

    this.abastecimentosExibidos$ = this.consultaFacade.dadosPaginados$;
    this.totalResultados$ = this.consultaFacade.abastecimentosFiltrados$.pipe(
      map((list) => list.length)
    );
    this.paginaAtual$ = this.consultaFacade.paginaAtual$;
    this.totalPaginas$ = this.consultaFacade.totalPaginas$;
  }

  ngOnInit(): void {
    // Reage a mudanças no formulário e atualiza a Facade.
    this.filterForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((valores) => {
      this.consultaFacade.atualizarFiltros(valores as Partial<FiltrosForm>);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Métodos para Filtragem
  limparFiltros(): void {
    this.filterForm.reset({
      uf: '',
      tipo: '',
      dataInicio: '',
      dataFim: '',
    });
  }

  // Métodos para Paginação
  proximaPagina(): void {
    this.paginaAtual$.pipe(take(1)).subscribe((atual) => {
      this.consultaFacade.mudarPagina(atual + 1);
    });
  }

  voltarPagina(): void {
    this.paginaAtual$.pipe(take(1)).subscribe((atual) => {
      if (atual > 1) {
        this.consultaFacade.mudarPagina(atual - 1);
      }
    });
  }
}
