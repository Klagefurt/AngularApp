import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from "./common-ui/profile-card/profile-card";
import { ProfileService } from './data/services/profile.service';
import {JsonPipe} from "@angular/common";
import { UserProfile } from './data/interfaces/profile.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  profileService = inject(ProfileService);
  profiles = signal<UserProfile[]>([]);

  constructor() {
    this.profileService.getTestAccounts().subscribe((accounts) => {
      this.profiles.set(accounts);
    });
  }
}

