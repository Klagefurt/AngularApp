import { Component, inject, signal } from '@angular/core';
import { ProfileCard } from "../../common-ui/profile-card/profile-card";
import { ProfileService } from '../../data/services/profile.service';
import { UserProfile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileService = inject(ProfileService);
  profiles = signal<UserProfile[]>([]);

  constructor() {
    this.profileService.getTestAccounts().subscribe((accounts) => {
      this.profiles.set(accounts);
    });
  }
}
