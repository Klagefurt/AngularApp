import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  getTestAccounts() {
    return this.http.get<UserProfile[]>(`/account/test_accounts`);
  }

  getMyProfile() {
    return this.http.get<UserProfile>(`/account/me`);
  }
}
