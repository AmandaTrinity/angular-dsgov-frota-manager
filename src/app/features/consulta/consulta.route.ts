import { Routes } from '@angular/router';

export const CONSULTA_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/consulta/consulta.component').then(m => m.ConsultaComponent),
    },
    {
        path: ':id',
        loadComponent: () => import('./pages/consulta/consulta-detalhe/consulta-detalhe.component').then(m => m.ConsultaDetalheComponent),
    }
];