import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}user/`;
  private tokenKey = 'token';
  private userKey = 'user';

  private userNameSubject = new BehaviorSubject<string | null>(
    this.getUserNameFromStorage()
  );
  userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, { name, email, password });
  }

  setToken(token: string): void {
    this.setLocalStorage(this.tokenKey, token);

    const userName = this.extractUserName(token);
    if (userName) {
      this.setLocalStorage(this.userKey, userName);
      this.userNameSubject.next(userName);
    }
  }

  getToken(): string | null {
    const token = this.getLocalStorage(this.tokenKey);
    if (token && this.isTokenExpired(token)) {
      this.removeToken();
      return null;
    }
    return token;
  }

  removeToken(): void {
    this.removeLocalStorage(this.tokenKey);
    this.removeLocalStorage(this.userKey);
    this.userNameSubject.next(null);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      return payload.exp ? payload.exp * 1000 < Date.now() : false;
    } catch (error) {
      console.error('Erro ao verificar expiração do token', error);
      return true;
    }
  }

  private extractUserName(token: string): string | null {
    try {
      const payload = this.decodeToken(token);
      return payload.name || payload.username || null;
    } catch (error) {
      console.error('Formato de token inválido', error);
      return null;
    }
  }

  private decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  private getUserNameFromStorage(): string | null {
    return this.getLocalStorage(this.userKey);
  }

  private setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  private removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
