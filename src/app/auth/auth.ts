import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  cookieService = inject(CookieService);

  accessToken: string | null = null;
  refreshToken: string | null = null;

  get isAuthenticated() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('access_token') || null;
    }
    return !!this.accessToken;
  }

  login(username: string, password: string) {

    const body = {
      username: username,
      password: password
    }
 
    return this.http.post<TokenResponse>(
      '/auth/token', 
      body
    ).pipe(
      tap(resp => {
        this.accessToken = resp.access_token;
        this.refreshToken = resp.refresh_token;

        this.cookieService.set('access_token', this.accessToken!, { path: '/' });
        this.cookieService.set('refresh_token', this.refreshToken!, { path: '/' });
      })
    );
  }
}
