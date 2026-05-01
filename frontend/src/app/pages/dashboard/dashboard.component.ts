import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Dashboard } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .dash-page {
      padding: 32px 24px;
      max-width: 900px;
      margin: 0 auto;
    }
    .dash-header {
      margin-bottom: 28px;
    }
    .dash-header h1 {
      font-size: 24px;
      font-weight: 800;
      color: #f0f0f0;
      margin: 0 0 4px;
    }
    .dash-header p {
      color: #666;
      font-size: 14px;
      margin: 0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .stat-card {
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }
    .stat-icon.red { background: #2d0f0f; }
    .stat-icon.green { background: #052e16; }
    .stat-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .5px;
      font-weight: 600;
      color: #666;
      margin-bottom: 6px;
    }
    .stat-value {
      font-size: 36px;
      font-weight: 800;
      line-height: 1;
    }
    .stat-value.red { color: #e8242c; }
    .stat-value.green { color: #22c55e; }
    .stat-sub {
      font-size: 12px;
      color: #555;
      margin-top: 6px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    .info-card {
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      border-radius: 12px;
      padding: 20px;
    }
    .info-card h4 {
      color: #888;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .5px;
      margin: 0 0 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      padding: 7px 0;
      border-bottom: 1px solid #222;
      color: #ccc;
    }
    .info-row:last-child { border-bottom: none; }
    .tag {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 6px;
      font-weight: 600;
    }
    .tag-open { background: #052e16; color: #22c55e; }
  `],
  template: `
    <div class="dash-page">
      <div class="dash-header">
        <h1>📊 Dashboard</h1>
        <p>Visão geral do dia — {{ hoje }}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon red">🧾</div>
          <div>
            <div class="stat-label">Pedidos Hoje</div>
            <div class="stat-value red">{{ data?.pedidosHoje ?? 0 }}</div>
            <div class="stat-sub">pedidos recebidos</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">💰</div>
          <div>
            <div class="stat-label">Total Vendido Hoje</div>
            <div class="stat-value green" style="font-size:26px">R$ {{ (data?.totalVendidoHoje ?? 0) | number:'1.2-2' }}</div>
            <div class="stat-sub">em faturamento</div>
          </div>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <h4>🏪 Informações da Loja</h4>
          <div class="info-row"><span>Status</span><span class="tag tag-open">Aberto</span></div>
          <div class="info-row"><span>Tipo</span><span>Balcão & Delivery</span></div>
          <div class="info-row"><span>Localização</span><span>Rolândia - PR</span></div>
        </div>
        <div class="info-card">
          <h4>⚡ Acesso Rápido</h4>
          <div class="info-row"><span>Cadastro de Produtos</span><a href="/produtos" style="color:#e8242c;text-decoration:none">Ir →</a></div>
          <div class="info-row"><span>Registrar Ponto</span><a href="/pontos" style="color:#e8242c;text-decoration:none">Ir →</a></div>
          <div class="info-row"><span>Ver Pedidos</span><a href="/pedidos" style="color:#e8242c;text-decoration:none">Ir →</a></div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  data?: Dashboard;
  hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.pedidoService.dashboard().subscribe(d => this.data = d);
  }
}
