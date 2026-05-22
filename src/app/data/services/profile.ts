import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  http = inject(HttpClient);

  getTestAccounts() {
    return this.http.get(`/account/test_accounts`);
  }
      
}
