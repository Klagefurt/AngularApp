import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);

  accessToken: string | null;
  refreshToken: string | null;

  constructor() {
    this.accessToken = this.cookieService.get('access_token') || null;
    this.refreshToken = this.cookieService.get('refresh_token') || null;
  }

  get isAuthenticated(): boolean { return !!this.accessToken; }

  login(username: string, password: string) {
    const body = { username, password }

    return this.http.post<TokenResponse>('/auth/token', body).pipe(
      tap(resp => this.saveTokens(resp.access_token, resp.refresh_token)),
      map(resp => !!resp.access_token )
    );
  }

  refreshAuthToken() {
    
    if (!this.refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<TokenResponse>('/auth/refresh', {
      refresh_token: this.refreshToken
    }).pipe(
      tap(resp => this.saveTokens(resp.access_token, resp.refresh_token)),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  logout() {
    this.cookieService.delete('access_token', '/');
    this.cookieService.delete('refresh_token', '/');
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.cookieService.set('access_token', accessToken, { path: '/' });
    this.cookieService.set('refresh_token', refreshToken, { path: '/' });
  }
}
