import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { ProdutoService } from '../../services/produto.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Pedido, Produto, Funcionario } from '../../models/models';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" style="padding-top:24px">
      <h1>Pedidos</h1>

      <div class="card gap">
        <h3>Novo Pedido</h3>
        <form (ngSubmit)="criar()">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label>Nome do Cliente</label>
              <input [(ngModel)]="form.nomeCliente" name="nomeCliente" required/>
            </div>
            <div>
              <label>Tipo</label>
              <select [(ngModel)]="form.tipoPedido" name="tipoPedido">
                <option value="balcao">Balcão</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
            <div>
              <label>Funcionário Responsável</label>
              <select [(ngModel)]="funcSelecionado" name="funcSelecionado">
                <option value="">Nenhum</option>
                <option *ngFor="let f of funcionarios" [value]="f.id">{{ f.nome }}</option>
              </select>
            </div>
          </div>
          <div style="margin:12px 0">
            <label>Produtos (selecione um ou mais)</label>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px">
              <label *ngFor="let p of produtos" style="display:flex;align-items:center;gap:4px;font-weight:normal">
                <input type="checkbox" [value]="p.id" (change)="toggleProduto(p, $event)"/>
                {{ p.nome }} - R$ {{ p.valor | number:'1.2-2' }}
              </label>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Criar Pedido</button>
        </form>
      </div>

      <table>
        <thead>
          <tr><th>Cliente</th><th>Tipo</th><th>Produtos</th><th>Total</th><th>Data</th><th>Status</th><th>Responsável</th><th>Ação</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of pedidos">
            <td>{{ p.nomeCliente }}</td>
            <td>{{ p.tipoPedido }}</td>
            <td>{{ nomeProdutos(p.produtos) }}</td>
            <td>R$ {{ p.valorTotal | number:'1.2-2' }}</td>
            <td>{{ p.data | date:'dd/MM/yy HH:mm' }}</td>
            <td>
              <span class="badge" [ngClass]="badgeClass(p.status!)">{{ p.status }}</span>
            </td>
            <td>{{ p.funcionarioResponsavel?.nome ?? '-' }}</td>
            <td>
              <select (change)="mudarStatus(p.id!, $any($event.target).value)">
                <option value="">-- Alterar --</option>
                <option value="RECEBIDO">Recebido</option>
                <option value="EM_PREPARO">Em Preparo</option>
                <option value="PRONTO">Pronto</option>
                <option value="ENTREGUE">Entregue</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  produtos: Produto[] = [];
  funcionarios: Funcionario[] = [];
  produtosSelecionados: Produto[] = [];
  funcSelecionado: any = '';
  form: Pedido = this.vazio();

  constructor(
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private funcService: FuncionarioService
  ) {}

  ngOnInit() {
    this.pedidoService.listar().subscribe(p => this.pedidos = p);
    this.produtoService.listar().subscribe(p => this.produtos = p);
    this.funcService.listar().subscribe(f => this.funcionarios = f);
  }

  toggleProduto(p: Produto, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) this.produtosSelecionados.push(p);
    else this.produtosSelecionados = this.produtosSelecionados.filter(x => x.id !== p.id);
  }

  criar() {
    const pedido: Pedido = {
      ...this.form,
      produtos: this.produtosSelecionados.map(p => ({ id: p.id } as Produto)),
      funcionarioResponsavel: this.funcSelecionado ? { id: +this.funcSelecionado } as Funcionario : undefined
    };
    this.pedidoService.criar(pedido).subscribe(() => {
      this.form = this.vazio();
      this.produtosSelecionados = [];
      this.funcSelecionado = '';
      this.pedidoService.listar().subscribe(p => this.pedidos = p);
    });
  }

  mudarStatus(id: number, status: string) {
    if (!status) return;
    this.pedidoService.atualizarStatus(id, status).subscribe(() => {
      this.pedidoService.listar().subscribe(p => this.pedidos = p);
    });
  }

  nomeProdutos(produtos: Produto[]): string {
    return produtos.map(p => p.nome).join(', ');
  }

  badgeClass(status: string): string {
    const map: any = { RECEBIDO: 'badge-recebido', EM_PREPARO: 'badge-preparo', PRONTO: 'badge-pronto', ENTREGUE: 'badge-entregue' };
    return map[status] ?? '';
  }

  vazio(): Pedido { return { nomeCliente: '', tipoPedido: 'balcao', produtos: [] }; }
}
