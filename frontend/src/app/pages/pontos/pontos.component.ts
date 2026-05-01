import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PontoService } from '../../services/ponto.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Ponto, Funcionario } from '../../models/models';

@Component({
  selector: 'app-pontos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" style="padding-top:24px">
      <h1>Controle de Ponto</h1>

      <div class="card gap">
        <h3>Bater Ponto</h3>
        <div style="display:flex;gap:12px;align-items:flex-end">
          <div style="flex:1">
            <label>Funcionário</label>
            <select [(ngModel)]="funcSelecionado">
              <option value="">Selecione...</option>
              <option *ngFor="let f of funcionarios" [value]="f.id">{{ f.nome }}</option>
            </select>
          </div>
          <button class="btn btn-primary" (click)="baterEntrada()" [disabled]="!funcSelecionado">Registrar Entrada</button>
          <button class="btn btn-success" (click)="baterSaida()" [disabled]="!funcSelecionado">Registrar Saída</button>
        </div>
        <div *ngIf="msg" class="alert" [ngClass]="erro ? 'alert-error' : 'alert-success'" style="margin-top:12px">{{ msg }}</div>
      </div>

      <table>
        <thead>
          <tr><th>Funcionário</th><th>Data</th><th>Entrada</th><th>Saída</th><th>Horas</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of pontos">
            <td>{{ p.funcionario.nome }}</td>
            <td>{{ p.data }}</td>
            <td>{{ p.entrada ?? '-' }}</td>
            <td>{{ p.saida ?? '-' }}</td>
            <td>{{ p.horasTrabalhadas != null ? (p.horasTrabalhadas | number:'1.1-1') + 'h' : '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PontosComponent implements OnInit {
  pontos: Ponto[] = [];
  funcionarios: Funcionario[] = [];
  funcSelecionado: any = '';
  msg = '';
  erro = false;

  constructor(private pontoService: PontoService, private funcService: FuncionarioService) {}

  ngOnInit() {
    this.pontoService.listar().subscribe(p => this.pontos = p);
    this.funcService.listar().subscribe(f => this.funcionarios = f);
  }

  baterEntrada() {
    this.pontoService.baterEntrada(+this.funcSelecionado).subscribe({
      next: () => { this.msg = 'Entrada registrada!'; this.erro = false; this.recarregar(); },
      error: (e) => { this.msg = e.error || 'Erro ao registrar entrada.'; this.erro = true; }
    });
  }

  baterSaida() {
    this.pontoService.baterSaida(+this.funcSelecionado).subscribe({
      next: () => { this.msg = 'Saída registrada!'; this.erro = false; this.recarregar(); },
      error: (e) => { this.msg = e.error || 'Erro ao registrar saída.'; this.erro = true; }
    });
  }

  recarregar() { this.pontoService.listar().subscribe(p => this.pontos = p); }
}
