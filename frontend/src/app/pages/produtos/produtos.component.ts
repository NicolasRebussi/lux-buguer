import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/models';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" style="padding-top:24px">
      <h1>Produtos</h1>

      <div class="card gap">
        <h3>{{ editando ? 'Editar' : 'Novo' }} Produto</h3>
        <form (ngSubmit)="salvar()">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
            <div>
              <label>Nome</label>
              <input [(ngModel)]="form.nome" name="nome" required/>
            </div>
            <div>
              <label>Valor (R$)</label>
              <input [(ngModel)]="form.valor" name="valor" type="number" step="0.01" required/>
            </div>
            <div>
              <label>Estoque</label>
              <input [(ngModel)]="form.quantidadeEstoque" name="quantidadeEstoque" type="number" required/>
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
          <tr><th>Nome</th><th>Valor</th><th>Estoque</th><th>Disponível</th><th>Ações</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of produtos">
            <td>{{ p.nome }}</td>
            <td>R$ {{ p.valor | number:'1.2-2' }}</td>
            <td>{{ p.quantidadeEstoque }}</td>
            <td>
              <span class="badge" [ngClass]="p.quantidadeEstoque > 0 ? 'badge-ativo' : 'badge-inativo'">
                {{ p.quantidadeEstoque > 0 ? 'Sim' : 'Não' }}
              </span>
            </td>
            <td class="actions">
              <button class="btn btn-secondary" (click)="editar(p)">Editar</button>
              <button class="btn btn-danger" (click)="deletar(p.id!)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  form: Produto = this.vazio();
  editando = false;

  constructor(private service: ProdutoService) {}

  ngOnInit() { this.carregar(); }
  carregar() { this.service.listar().subscribe(p => this.produtos = p); }

  salvar() {
    if (this.editando && this.form.id) {
      this.service.atualizar(this.form.id, this.form).subscribe(() => { this.cancelar(); this.carregar(); });
    } else {
      this.service.criar(this.form).subscribe(() => { this.form = this.vazio(); this.carregar(); });
    }
  }

  editar(p: Produto) { this.form = { ...p }; this.editando = true; }
  cancelar() { this.form = this.vazio(); this.editando = false; }
  deletar(id: number) { if (confirm('Excluir produto?')) this.service.deletar(id).subscribe(() => this.carregar()); }
  vazio(): Produto { return { nome: '', valor: 0, quantidadeEstoque: 0 }; }
}
