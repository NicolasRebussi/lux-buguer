import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  styles: [`
    .login-page {
      min-height: 100vh;
      background: #0d0d0d;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-card {
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      border-radius: 16px;
      padding: 40px 36px;
      width: 100%;
      max-width: 380px;
    }
    .login-logo {
      text-align: center;
      font-size: 48px;
      margin-bottom: 8px;
    }
    .login-title {
      text-align: center;
      font-size: 22px;
      font-weight: 800;
      color: #f0f0f0;
      margin-bottom: 4px;
    }
    .login-sub {
      text-align: center;
      font-size: 13px;
      color: #666;
      margin-bottom: 28px;
    }
    .field { margin-bottom: 16px; }
    .field label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .5px;
      color: #888;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .field input {
      width: 100%;
      background: #141414;
      border: 1px solid #2e2e2e;
      border-radius: 8px;
      padding: 11px 14px;
      color: #f0f0f0;
      font-size: 14px;
      transition: border-color .15s;
    }
    .field input:focus { outline: none; border-color: #e8242c; }
    .submit-btn {
      width: 100%;
      background: #e8242c;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 13px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 8px;
      transition: background .15s;
    }
    .submit-btn:hover { background: #c71f26; }
    .error-msg {
      background: #450a0a;
      color: #fca5a5;
      border: 1px solid #7f1d1d;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 13px;
      margin-bottom: 16px;
    }
    .divider {
      border: none;
      border-top: 1px solid #2e2e2e;
      margin: 20px 0;
    }
    .cliente-link {
      display: block;
      text-align: center;
      color: #888;
      font-size: 13px;
      text-decoration: none;
    }
    .cliente-link span { color: #e8242c; font-weight: 600; }
  `],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">🍔</div>
        <div class="login-title">LUX BURGER</div>
        <div class="login-sub">Acesso interno — equipe</div>

        <div class="error-msg" *ngIf="erro">{{ erro }}</div>

        <form (ngSubmit)="entrar()">
          <div class="field">
            <label>Usuário</label>
            <input [(ngModel)]="username" name="username" required placeholder="admin" autocomplete="username"/>
          </div>
          <div class="field">
            <label>Senha</label>
            <input [(ngModel)]="password" name="password" type="password" required placeholder="••••••••" autocomplete="current-password"/>
          </div>
          <button class="submit-btn" type="submit">Entrar</button>
        </form>

        <hr class="divider"/>
        <a class="cliente-link" routerLink="/cliente" [routerLink]="['/cliente']">
          Ver cardápio como <span>cliente →</span>
        </a>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  erro = '';

  constructor(private authService: AuthService, private router: Router) {}

  entrar() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        if (res.sucesso) this.router.navigate(['/dashboard']);
        else this.erro = res.mensagem;
      },
      error: () => this.erro = 'Erro ao conectar com o servidor.'
    });
  }
}
