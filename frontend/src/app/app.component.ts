import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  styles: [`
    .admin-nav {
      background: #161616;
      border-bottom: 1px solid #2e2e2e;
      padding: 0 24px;
      display: flex;
      align-items: center;
      height: 56px;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-brand {
      font-size: 16px;
      font-weight: 800;
      color: #e8242c;
      margin-right: 24px;
      letter-spacing: -.3px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .nav-links { display: flex; align-items: center; gap: 2px; }
    .nav-links a {
      color: #888;
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      transition: color .15s, background .15s;
    }
    .nav-links a:hover { color: #f0f0f0; background: #222; }
    .nav-links a.active { color: #f0f0f0; background: #2a2a2a; }
    .nav-logout {
      margin-left: auto;
      background: none;
      border: 1px solid #2e2e2e;
      color: #888;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: color .15s, border-color .15s;
    }
    .nav-logout:hover { color: #e8242c; border-color: #e8242c; }
  `],
  template: `
    <div class="admin-nav" *ngIf="authService.isLoggedIn()">
      <div class="nav-brand">🍔 LUX BURGER</div>
      <div class="nav-links">
        <a routerLink="/dashboard" routerLinkActive="active">📊 Dashboard</a>
        <a routerLink="/funcionarios" routerLinkActive="active">👥 Funcionários</a>
        <a routerLink="/pontos" routerLinkActive="active">⏱️ Ponto</a>
        <a routerLink="/produtos" routerLinkActive="active">📦 Produtos</a>
        <a routerLink="/pedidos" routerLinkActive="active">🧾 Pedidos</a>
        <a routerLink="/cliente" routerLinkActive="active">🛒 Cardápio</a>
      </div>
      <button class="nav-logout" (click)="logout()">Sair</button>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
