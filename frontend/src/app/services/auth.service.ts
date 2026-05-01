import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API}/login`, { username, password }).pipe(
      tap(res => {
        if (res.sucesso) {
          localStorage.setItem('user', JSON.stringify(res));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser(): any {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }
}
