import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Dashboard } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" style="padding-top:30px">
      <h1>Dashboard</h1>
      <div style="display:flex;gap:20px;flex-wrap:wrap">
        <div class="card" style="flex:1;min-width:200px;text-align:center">
          <h3>Pedidos Hoje</h3>
          <p style="font-size:48px;color:#c0392b;font-weight:bold">{{ data?.pedidosHoje ?? 0 }}</p>
        </div>
        <div class="card" style="flex:1;min-width:200px;text-align:center">
          <h3>Total Vendido Hoje</h3>
          <p style="font-size:36px;color:#27ae60;font-weight:bold">R$ {{ (data?.totalVendidoHoje ?? 0) | number:'1.2-2' }}</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  data?: Dashboard;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.pedidoService.dashboard().subscribe(d => this.data = d);
  }
}
