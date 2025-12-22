import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaDetalheComponent } from './pages/consulta/consulta-detalhe/consulta-detalhe';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: 'consulta',
    data: {
      breadcrumb: 'Consulta'
    },
    children: [
      {
        path: '',
        component: ConsultaComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: ConsultaDetalheComponent,
        data: {
          breadcrumb: 'Detalhe'
        }
      }
    ]
  }
];
