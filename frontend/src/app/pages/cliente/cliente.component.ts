import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { PedidoService } from '../../services/pedido.service';
import { Produto, Pedido } from '../../models/models';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="background:#c0392b;padding:16px 24px;color:white;font-size:20px;font-weight:bold">
      🍔 Cardápio
    </div>

    <div class="container" style="padding-top:24px">
      <div *ngIf="!pedidoCriado">
        <h2>Nosso Cardápio</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:24px">
          <div *ngFor="let p of produtos" class="card" style="text-align:center">
            <h3 style="font-size:16px">{{ p.nome }}</h3>
            <p style="color:#27ae60;font-size:20px;font-weight:bold;margin:8px 0">R$ {{ p.valor | number:'1.2-2' }}</p>
            <span class="badge" [ngClass]="p.quantidadeEstoque > 0 ? 'badge-ativo' : 'badge-inativo'">
              {{ p.quantidadeEstoque > 0 ? 'Disponível' : 'Indisponível' }}
            </span>
            <br><br>
            <button class="btn btn-primary" [disabled]="p.quantidadeEstoque === 0" (click)="adicionar(p)">
              Adicionar
            </button>
          </div>
        </div>

        <div class="card" *ngIf="carrinho.length > 0">
          <h3>Meu Pedido</h3>
          <div style="margin:12px 0">
            <label>Seu nome</label>
            <input [(ngModel)]="nomeCliente" placeholder="Nome do cliente" style="max-width:300px"/>
          </div>
          <div style="margin:12px 0">
            <label>Tipo</label>
            <select [(ngModel)]="tipoPedido" style="max-width:200px">
              <option value="balcao">Balcão</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <ul style="margin:12px 0;padding-left:20px">
            <li *ngFor="let item of carrinho" style="margin-bottom:4px">
              {{ item.nome }} — R$ {{ item.valor | number:'1.2-2' }}
              <button class="btn btn-danger" style="padding:2px 8px;margin-left:8px;font-size:12px" (click)="remover(item)">X</button>
            </li>
          </ul>
          <p><strong>Total: R$ {{ total() | number:'1.2-2' }}</strong></p>
          <button class="btn btn-primary" style="margin-top:12px" (click)="fazerPedido()" [disabled]="!nomeCliente">
            Confirmar Pedido
          </button>
        </div>
      </div>

      <div *ngIf="pedidoCriado" class="card" style="text-align:center;max-width:400px;margin:60px auto">
        <h2 style="color:#27ae60">Pedido Realizado!</h2>
        <p style="margin:12px 0">Seu pedido foi recebido com sucesso. Aguarde!</p>
        <button class="btn btn-primary" (click)="novoPedido()">Fazer outro pedido</button>
      </div>
    </div>
  `
})
export class ClienteComponent implements OnInit {
  produtos: Produto[] = [];
  carrinho: Produto[] = [];
  nomeCliente = '';
  tipoPedido = 'balcao';
  pedidoCriado = false;

  constructor(private produtoService: ProdutoService, private pedidoService: PedidoService) {}

  ngOnInit() { this.produtoService.listar().subscribe(p => this.produtos = p); }

  adicionar(p: Produto) { this.carrinho.push(p); }
  remover(p: Produto) { const i = this.carrinho.indexOf(p); if (i > -1) this.carrinho.splice(i, 1); }
  total() { return this.carrinho.reduce((acc, p) => acc + p.valor, 0); }

  fazerPedido() {
    const pedido: Pedido = {
      nomeCliente: this.nomeCliente,
      tipoPedido: this.tipoPedido,
      produtos: this.carrinho.map(p => ({ id: p.id } as Produto))
    };
    this.pedidoService.criar(pedido).subscribe(() => { this.pedidoCriado = true; });
  }

  novoPedido() { this.carrinho = []; this.nomeCliente = ''; this.pedidoCriado = false; }
}
