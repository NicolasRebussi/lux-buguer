import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: 'funcionarios', loadComponent: () => import('./pages/funcionarios/funcionarios.component').then(m => m.FuncionariosComponent), canActivate: [authGuard] },
  { path: 'pontos', loadComponent: () => import('./pages/pontos/pontos.component').then(m => m.PontosComponent), canActivate: [authGuard] },
  { path: 'produtos', loadComponent: () => import('./pages/produtos/produtos.component').then(m => m.ProdutosComponent), canActivate: [authGuard] },
  { path: 'pedidos', loadComponent: () => import('./pages/pedidos/pedidos.component').then(m => m.PedidosComponent), canActivate: [authGuard] },
  { path: 'cliente', loadComponent: () => import('./pages/cliente/cliente.component').then(m => m.ClienteComponent) },
  { path: '**', redirectTo: 'login' }
];
