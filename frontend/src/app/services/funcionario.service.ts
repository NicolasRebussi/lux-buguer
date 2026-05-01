import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/models';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private readonly API = 'http://localhost:8081/api/funcionarios';

  constructor(private http: HttpClient) {}

  listar(): Observable<Funcionario[]> { return this.http.get<Funcionario[]>(this.API); }
  buscar(id: number): Observable<Funcionario> { return this.http.get<Funcionario>(`${this.API}/${id}`); }
  criar(f: Funcionario): Observable<Funcionario> { return this.http.post<Funcionario>(this.API, f); }
  atualizar(id: number, f: Funcionario): Observable<Funcionario> { return this.http.put<Funcionario>(`${this.API}/${id}`, f); }
  deletar(id: number): Observable<void> { return this.http.delete<void>(`${this.API}/${id}`); }
}
