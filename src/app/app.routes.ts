import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    title: 'Auth',
    loadChildren: () => import('./auth/auth.routes').then(routes => routes.authRoutes)
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadChildren: () => import('./website/dashboard.routes').then(routes => routes.dashboardRoutes)
  }
];
