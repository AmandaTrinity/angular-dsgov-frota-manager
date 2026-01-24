import { Injectable } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';

// Interface do modelo
interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  
  /**
   * Método público que inicia a construção dos breadcrumbs
   */
  public getBreadcrumbs(route: ActivatedRoute): Breadcrumb[] {
    return this.createBreadcrumbs(route);
  }

  /**
   * Constrói o array de breadcrumbs percorrendo a árvore de rotas.
   */
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (!label) {
        breadcrumbs = this.createBreadcrumbs(child, url, breadcrumbs);
        continue;
      }

      const routeUrl: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeUrl) {
        url += `/${routeUrl}`;
      }

      breadcrumbs.push({ label, url });
      breadcrumbs = this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}