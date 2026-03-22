import { Component, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConsultaFacade } from '../../facades/consulta.facade';

// Define um tipo para os valores do formulário
interface FiltrosForm {
  uf: string | null;
  tipo: string | null;
  dataInicio: string | null;
  dataFim: string | null;
}

@Component({
  selector: 'app-consulta',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly consultaFacade = inject(ConsultaFacade);

  // Estado para Filtragem
  filterForm: FormGroup = this.fb.group({
    uf: [''],
    tipo: [''],
    dataInicio: [''],
    dataFim: [''],
  });
  ufs = ['SP', 'RJ', 'MG', 'PR', 'RS', 'BA', 'SC', 'GO', 'PE', 'CE', 'AM'];

  // Estado para Exibição de Dados e Paginação em signals
  readonly abastecimentosExibidos = this.consultaFacade.dadosPaginados;
  readonly totalResultados = computed(() => this.consultaFacade.abastecimentosFiltrados().length);
  readonly paginaAtual = this.consultaFacade.paginaAtual;
  readonly totalPaginas = this.consultaFacade.totalPaginas;

  private destroy$ = new Subject<void>();

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
    this.consultaFacade.mudarPagina(this.paginaAtual() + 1);
  }

  voltarPagina(): void {
    if (this.paginaAtual() > 1) {
      this.consultaFacade.mudarPagina(this.paginaAtual() - 1);
    }
  }
}
