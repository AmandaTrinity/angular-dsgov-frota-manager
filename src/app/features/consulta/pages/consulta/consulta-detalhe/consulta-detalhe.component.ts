import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
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
export class ConsultaDetalheComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly consultaFacade = inject(ConsultaFacade);
  location = inject(Location);
  messageService = inject(MessageService);

  private readonly idSignal = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  readonly abastecimento: Signal<Abastecimento | undefined> = computed(() => {
    const id = this.idSignal();
    const lista = this.consultaFacade.abastecimentosFiltrados();
    return lista.find((item: Abastecimento) => item.id === id);
  });

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
