import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, Dashboard } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly API = 'http://localhost:8081/api/pedidos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pedido[]> { return this.http.get<Pedido[]>(this.API); }
  criar(p: Pedido): Observable<Pedido> { return this.http.post<Pedido>(this.API, p); }
  atualizarStatus(id: number, status: string): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.API}/${id}/status`, { status });
  }
  dashboard(): Observable<Dashboard> { return this.http.get<Dashboard>(`${this.API}/dashboard`); }
}
