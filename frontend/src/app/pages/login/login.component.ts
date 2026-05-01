import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;background:#c0392b;">
      <div class="card" style="width:360px">
        <h2 style="text-align:center;margin-bottom:20px">🍔 Hamburgueria</h2>
        <div *ngIf="erro" class="alert alert-error">{{ erro }}</div>
        <form (ngSubmit)="entrar()">
          <label>Usuário</label>
          <input [(ngModel)]="username" name="username" required placeholder="admin"/>
          <label>Senha</label>
          <input [(ngModel)]="password" name="password" type="password" required placeholder="admin123"/>
          <button class="btn btn-primary" style="width:100%;margin-top:8px" type="submit">Entrar</button>
        </form>
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
