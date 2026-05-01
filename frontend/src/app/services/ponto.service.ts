import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ponto } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PontoService {
  private readonly API = 'http://localhost:8081/api/pontos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Ponto[]> { return this.http.get<Ponto[]>(this.API); }
  baterEntrada(funcionarioId: number): Observable<Ponto> {
    return this.http.post<Ponto>(`${this.API}/entrada/${funcionarioId}`, {});
  }
  baterSaida(funcionarioId: number): Observable<Ponto> {
    return this.http.post<Ponto>(`${this.API}/saida/${funcionarioId}`, {});
  }
}
