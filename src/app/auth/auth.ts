import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post('/auth/token', { username, password });
  }
}
