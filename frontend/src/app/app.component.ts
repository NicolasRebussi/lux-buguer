import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div *ngIf="authService.isLoggedIn()">
      <nav>
        <span class="brand">🍔 Hamburgueria</span>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/funcionarios" routerLinkActive="active">Funcionários</a>
        <a routerLink="/pontos" routerLinkActive="active">Ponto</a>
        <a routerLink="/produtos" routerLinkActive="active">Produtos</a>
        <a routerLink="/pedidos" routerLinkActive="active">Pedidos</a>
        <a routerLink="/cliente" routerLinkActive="active">Área do Cliente</a>
        <a href="#" (click)="logout($event)" style="margin-left:auto">Sair</a>
      </nav>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(e: Event) {
    e.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
