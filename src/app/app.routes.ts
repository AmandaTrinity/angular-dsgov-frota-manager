import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/dashboard/dashboard.route').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'consulta',
    loadChildren: () => import('./features/consulta/consulta.route').then(m => m.CONSULTA_ROUTES),
  },
];