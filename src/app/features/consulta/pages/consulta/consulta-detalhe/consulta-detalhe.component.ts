import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { ConsultaFacade } from '../../../facades/consulta.facade';
import { Abastecimento } from '../../../../../core/models/abastecimento.model';
import { CpfMaskPipe } from '../../../../../shared/pipes/cpf-mask.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta-detalhe',
  imports: [CommonModule, RouterModule, CpfMaskPipe, ToastModule],
  templateUrl: './consulta-detalhe.component.html',
  styleUrl: './consulta-detalhe.component.scss',
  providers: [MessageService],
})
export class ConsultaDetalheComponent implements OnInit {
  abastecimento$!: Observable<Abastecimento | undefined>;

  route = inject(ActivatedRoute);
  consultaFacade = inject(ConsultaFacade);
  location = inject(Location);
  messageService = inject(MessageService);

  ngOnInit(): void {
    // Abordagem reativa para buscar o abastecimento.
    // Isso garante que os dados sejam atualizados se o ID na URL mudar
    // sem que o usuário saia da página (ex: navegação interna).
    this.abastecimento$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) =>
        this.consultaFacade.abastecimentosFiltrados$.pipe(
          map((lista) => lista.find((item) => item.id === id))
        )
      )
    );
  }

  voltar(): void {
    this.location.back();
  }

  reportarErro(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Solicitação enviada',
      detail: 'Obrigado! Sua solicitação de correção foi enviada para análise.',
      life: 4000,
    });
  }
}
