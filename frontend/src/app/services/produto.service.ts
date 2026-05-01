import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly API = 'http://localhost:8081/api/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> { return this.http.get<Produto[]>(this.API); }
  criar(p: Produto): Observable<Produto> { return this.http.post<Produto>(this.API, p); }
  atualizar(id: number, p: Produto): Observable<Produto> { return this.http.put<Produto>(`${this.API}/${id}`, p); }
  deletar(id: number): Observable<void> { return this.http.delete<void>(`${this.API}/${id}`); }
}
