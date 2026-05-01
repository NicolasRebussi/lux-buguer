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
  styles: [`
    .lux-navbar {
      background: #111;
      border-bottom: 1px solid #2e2e2e;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 32px;
      height: 60px;
      position: sticky;
      top: 0;
      z-index: 200;
    }
    .lux-logo {
      font-size: 20px;
      font-weight: 800;
      color: #e8242c;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .lux-search {
      flex: 1;
      max-width: 400px;
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      border-radius: 8px;
      padding: 8px 14px;
      color: #f0f0f0;
      font-size: 14px;
    }
    .lux-search:focus { outline: none; border-color: #e8242c; }
    .cart-btn {
      margin-left: auto;
      background: #e8242c;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 18px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background .15s;
    }
    .cart-btn:hover { background: #c71f26; }
    .cart-badge {
      background: white;
      color: #e8242c;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 11px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero {
      width: 100%;
      height: 260px;
      object-fit: cover;
      display: block;
      background: linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 50%, #1a0a0a 100%);
      position: relative;
      overflow: hidden;
    }
    .hero-overlay {
      width: 100%;
      height: 260px;
      background: linear-gradient(135deg, #1c0808 0%, #3d0e0e 40%, #1c0808 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 80px;
    }
    .store-info {
      background: #161616;
      border-bottom: 1px solid #2e2e2e;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .store-logo {
      width: 72px;
      height: 72px;
      border-radius: 12px;
      background: #1c1c1c;
      border: 2px solid #2e2e2e;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      flex-shrink: 0;
    }
    .store-name { font-size: 22px; font-weight: 800; color: #f0f0f0; }
    .store-meta { font-size: 13px; color: #888; margin-top: 4px; display: flex; align-items: center; gap: 8px; }
    .store-open { color: #22c55e; font-weight: 600; }
    .layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 20px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 800;
      color: #f0f0f0;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e8242c;
      display: inline-block;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .product-card {
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: transform .15s, border-color .15s;
      display: flex;
      flex-direction: column;
    }
    .product-card:hover { transform: translateY(-3px); border-color: #444; }
    .product-card.esgotado { opacity: .5; pointer-events: none; }
    .product-img {
      height: 130px;
      background: linear-gradient(135deg, #2a1010, #3d1515);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }
    .product-body { padding: 14px; flex: 1; display: flex; flex-direction: column; }
    .product-name { font-size: 15px; font-weight: 700; color: #f0f0f0; margin-bottom: 6px; }
    .product-price { font-size: 17px; font-weight: 800; color: #22c55e; margin-top: auto; margin-bottom: 12px; }
    .add-btn {
      background: #e8242c;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      width: 100%;
      transition: background .15s;
    }
    .add-btn:hover { background: #c71f26; }
    /* Cart sidebar */
    .cart-sidebar {
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      border-radius: 12px;
      padding: 20px;
      position: sticky;
      top: 80px;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
    }
    .cart-empty {
      text-align: center;
      padding: 40px 0;
      color: #555;
    }
    .cart-empty-icon { font-size: 48px; margin-bottom: 12px; }
    .cart-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #2e2e2e;
      font-size: 14px;
    }
    .cart-item-name { color: #f0f0f0; font-weight: 500; }
    .cart-item-price { color: #22c55e; font-weight: 700; font-size: 13px; }
    .cart-remove {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      font-size: 16px;
      padding: 2px 6px;
      border-radius: 4px;
      transition: color .15s, background .15s;
    }
    .cart-remove:hover { color: #e8242c; background: #2d0f0f; }
    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0 16px;
      font-weight: 700;
    }
    .cart-total-value { color: #22c55e; font-size: 20px; }
    .form-group { margin-bottom: 14px; }
    .form-label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .5px;
      color: #888;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .form-input {
      background: #141414;
      border: 1px solid #2e2e2e;
      border-radius: 8px;
      padding: 9px 12px;
      color: #f0f0f0;
      font-size: 14px;
      width: 100%;
    }
    .form-input:focus { outline: none; border-color: #e8242c; }
    .tipo-btns { display: flex; gap: 8px; }
    .tipo-btn {
      flex: 1;
      padding: 8px;
      border: 1px solid #2e2e2e;
      border-radius: 8px;
      background: #141414;
      color: #888;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all .15s;
    }
    .tipo-btn.active { border-color: #e8242c; color: #e8242c; background: #2d0f0f; }
    .confirm-btn {
      width: 100%;
      background: #e8242c;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 13px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: background .15s;
      margin-top: 8px;
    }
    .confirm-btn:hover { background: #c71f26; }
    .confirm-btn:disabled { background: #333; color: #555; cursor: not-allowed; }
    /* Success */
    .success-screen {
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .success-card {
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      border-radius: 16px;
      padding: 48px 40px;
      text-align: center;
      max-width: 380px;
    }
    .success-icon { font-size: 64px; margin-bottom: 20px; }
    @media (max-width: 768px) {
      .layout { grid-template-columns: 1fr; }
      .cart-sidebar { position: static; }
    }
  `],
  template: `
    <!-- Navbar -->
    <div class="lux-navbar">
      <div class="lux-logo">🍔 LUX BURGER</div>
      <input class="lux-search" [(ngModel)]="busca" placeholder="🔍  Busque por um produto..." (input)="filtrar()"/>
      <button class="cart-btn" (click)="scrollToCart()">
        🛒 Sacola
        <span class="cart-badge" *ngIf="carrinho.length > 0">{{ carrinho.length }}</span>
      </button>
    </div>

    <!-- Hero -->
    <div class="hero-overlay">🍔</div>

    <!-- Store info -->
    <div class="store-info">
      <div class="store-logo">🍔</div>
      <div>
        <div class="store-name">LUX BURGER</div>
        <div class="store-meta">
          <span class="store-open">● Aberto</span>
          <span>•</span>
          <span>📍 Rolândia - PR</span>
          <span>•</span>
          <span>Balcão & Delivery</span>
        </div>
      </div>
    </div>

    <!-- Success screen -->
    <div class="success-screen" *ngIf="pedidoCriado">
      <div class="success-card">
        <div class="success-icon">✅</div>
        <h2 style="margin-bottom:10px">Pedido Realizado!</h2>
        <p style="color:#888;margin-bottom:24px">Seu pedido foi recebido com sucesso. Em breve será preparado!</p>
        <button class="confirm-btn" (click)="novoPedido()">Fazer outro pedido</button>
      </div>
    </div>

    <!-- Main layout -->
    <div class="layout" *ngIf="!pedidoCriado">

      <!-- Products -->
      <div>
        <div style="margin-bottom:8px">
          <span class="section-title">🔥 Nosso Cardápio</span>
        </div>
        <div class="products-grid">
          <div
            *ngFor="let p of produtosFiltrados"
            class="product-card"
            [class.esgotado]="p.quantidadeEstoque === 0"
            (click)="p.quantidadeEstoque > 0 && adicionar(p)">
            <div class="product-img">🍔</div>
            <div class="product-body">
              <div class="product-name">{{ p.nome }}</div>
              <div class="product-price">R$ {{ p.valor | number:'1.2-2' }}</div>
              <button class="add-btn" [disabled]="p.quantidadeEstoque === 0">
                {{ p.quantidadeEstoque > 0 ? '+ Adicionar' : 'Esgotado' }}
              </button>
            </div>
          </div>
        </div>
        <div *ngIf="produtosFiltrados.length === 0" style="text-align:center;padding:40px;color:#555">
          Nenhum produto encontrado.
        </div>
      </div>

      <!-- Cart Sidebar -->
      <div>
        <div class="cart-sidebar" id="cart">
          <div style="font-size:15px;font-weight:800;margin-bottom:16px;color:#f0f0f0">🛒 Sua Sacola</div>

          <div class="cart-empty" *ngIf="carrinho.length === 0">
            <div class="cart-empty-icon">🛍️</div>
            <div style="font-size:14px">Sacola vazia</div>
            <div style="font-size:12px;margin-top:4px">Adicione itens do cardápio</div>
          </div>

          <div *ngIf="carrinho.length > 0">
            <div class="cart-item" *ngFor="let item of carrinho; let i = index">
              <div>
                <div class="cart-item-name">{{ item.nome }}</div>
                <div class="cart-item-price">R$ {{ item.valor | number:'1.2-2' }}</div>
              </div>
              <button class="cart-remove" (click)="removerIdx(i)">✕</button>
            </div>

            <div class="cart-total">
              <span style="color:#888;font-size:14px">Total</span>
              <span class="cart-total-value">R$ {{ total() | number:'1.2-2' }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Seu nome</label>
              <input class="form-input" [(ngModel)]="nomeCliente" placeholder="Ex: João Silva"/>
            </div>

            <div class="form-group">
              <label class="form-label">Tipo do pedido</label>
              <div class="tipo-btns">
                <button class="tipo-btn" [class.active]="tipoPedido==='balcao'" (click)="tipoPedido='balcao'">🏪 Balcão</button>
                <button class="tipo-btn" [class.active]="tipoPedido==='delivery'" (click)="tipoPedido='delivery'">🛵 Delivery</button>
              </div>
            </div>

            <button class="confirm-btn" (click)="fazerPedido()" [disabled]="!nomeCliente">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>

    </div>
  `
})
export class ClienteComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  carrinho: Produto[] = [];
  nomeCliente = '';
  tipoPedido = 'balcao';
  pedidoCriado = false;
  busca = '';

  constructor(private produtoService: ProdutoService, private pedidoService: PedidoService) {}

  ngOnInit() {
    this.produtoService.listar().subscribe(p => {
      this.produtos = p;
      this.produtosFiltrados = p;
    });
  }

  filtrar() {
    const q = this.busca.toLowerCase();
    this.produtosFiltrados = this.produtos.filter(p => p.nome.toLowerCase().includes(q));
  }

  adicionar(p: Produto) { this.carrinho.push({ ...p }); }

  removerIdx(i: number) { this.carrinho.splice(i, 1); }

  remover(p: Produto) { const i = this.carrinho.indexOf(p); if (i > -1) this.carrinho.splice(i, 1); }

  total() { return this.carrinho.reduce((acc, p) => acc + p.valor, 0); }

  scrollToCart() { document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' }); }

  fazerPedido() {
    const pedido: Pedido = {
      nomeCliente: this.nomeCliente,
      tipoPedido: this.tipoPedido,
      produtos: this.carrinho.map((p: Produto) => ({ id: p.id } as Produto))
    };
    this.pedidoService.criar(pedido).subscribe(() => { this.pedidoCriado = true; });
  }

  novoPedido() { this.carrinho = []; this.nomeCliente = ''; this.pedidoCriado = false; }
}
