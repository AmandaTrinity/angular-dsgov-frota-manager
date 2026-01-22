import { Component, DestroyRef, OnInit, inject } from '@angular/core';

import {
  RouterModule,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreadCrumbService } from '../../../core/services/breadcrumb.service';

// Define a estrutura de um item do breadcrumb
interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-gov-header',
  imports: [RouterModule],
  templateUrl: './gov-header.component.html',
  styleUrls: ['./gov-header.component.scss'],
})
export class GovHeaderComponent implements OnInit {
  // Array que guardará os breadcrumbs da rota ativa
  public breadcrumbs: Breadcrumb[] = [];

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly breadcrumbService = inject(BreadCrumbService);

  private updateBreadcrumbs(): void {
    this.breadcrumbs = this.breadcrumbService.getBreadcrumbs(this.activatedRoute.root);
  }

  ngOnInit() {
    // Escuta os eventos de navegação do roteador
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        // A cada nova navegação, reconstrói o breadcrumb
        this.updateBreadcrumbs();
      });

    // Inicializa os breadcrumbs no carregamento inicial do componente
    this.updateBreadcrumbs();
  }

}
