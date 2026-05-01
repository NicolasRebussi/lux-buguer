import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/models';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" style="padding-top:24px">
      <h1>Funcionários</h1>

      <div class="card">
        <h3>{{ editando ? 'Editar' : 'Novo' }} Funcionário</h3>
        <form (ngSubmit)="salvar()">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label>Nome</label>
              <input [(ngModel)]="form.nome" name="nome" required/>
            </div>
            <div>
              <label>Função</label>
              <select [(ngModel)]="form.funcao" name="funcao">
                <option>Atendente</option>
                <option>Cozinheiro</option>
                <option>Entregador</option>
                <option>Gerente</option>
              </select>
            </div>
            <div>
              <label>Status</label>
              <select [(ngModel)]="form.status" name="status">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
            <div>
              <label>Salário (R$)</label>
              <input [(ngModel)]="form.salario" name="salario" type="number" step="0.01"/>
            </div>
            <div>
              <label>Dias Trabalhados</label>
              <input [(ngModel)]="form.diasTrabalhados" name="diasTrabalhados" type="number"/>
            </div>
            <div>
              <label>Horas Trabalhadas</label>
              <input [(ngModel)]="form.horasTrabalhadas" name="horasTrabalhadas" type="number" step="0.1"/>
            </div>
          </div>
          <div class="actions" style="margin-top:8px">
            <button class="btn btn-primary" type="submit">{{ editando ? 'Atualizar' : 'Cadastrar' }}</button>
            <button *ngIf="editando" class="btn btn-secondary" type="button" (click)="cancelar()">Cancelar</button>
          </div>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th><th>Função</th><th>Status</th><th>Salário</th><th>Dias</th><th>Horas</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let f of funcionarios">
            <td>{{ f.nome }}</td>
            <td>{{ f.funcao }}</td>
            <td><span class="badge" [ngClass]="'badge-' + f.status">{{ f.status }}</span></td>
            <td>R$ {{ f.salario | number:'1.2-2' }}</td>
            <td>{{ f.diasTrabalhados }}</td>
            <td>{{ f.horasTrabalhadas | number:'1.1-1' }}h</td>
            <td class="actions">
              <button class="btn btn-secondary" (click)="editar(f)">Editar</button>
              <button class="btn btn-danger" (click)="deletar(f.id!)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class FuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  form: Funcionario = this.vazio();
  editando = false;

  constructor(private service: FuncionarioService) {}

  ngOnInit() { this.carregar(); }

  carregar() { this.service.listar().subscribe(f => this.funcionarios = f); }

  salvar() {
    if (this.editando && this.form.id) {
      this.service.atualizar(this.form.id, this.form).subscribe(() => { this.cancelar(); this.carregar(); });
    } else {
      this.service.criar(this.form).subscribe(() => { this.form = this.vazio(); this.carregar(); });
    }
  }

  editar(f: Funcionario) { this.form = { ...f }; this.editando = true; }
  cancelar() { this.form = this.vazio(); this.editando = false; }
  deletar(id: number) { if (confirm('Excluir funcionário?')) this.service.deletar(id).subscribe(() => this.carregar()); }

  vazio(): Funcionario {
    return { nome: '', funcao: 'Atendente', status: 'ativo', salario: 0, diasTrabalhados: 0, horasTrabalhadas: 0 };
  }
}
