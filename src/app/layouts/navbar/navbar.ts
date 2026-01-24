import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreadCrumbService } from '../../core/services/breadcrumb.service';
import { GovHeaderComponent } from '../../shared/components/gov-header/gov-header.component';

// Define a estrutura de um item do breadcrumb
export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [GovHeaderComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements OnInit {
  // Signal para os breadcrumbs da rota ativa
  breadcrumbs = signal<Breadcrumb[]>([]);

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly breadcrumbService = inject(BreadCrumbService);

  private updateBreadcrumbs(): void {
    this.breadcrumbs.set(
      this.breadcrumbService.getBreadcrumbs(this.activatedRoute.root)
    );
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
