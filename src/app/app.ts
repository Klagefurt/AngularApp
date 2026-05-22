import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from "./common-ui/profile-card/profile-card";
import { Profile } from './data/services/profile';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  //protected readonly title = signal('tik-talk');
  profileService = inject(Profile);
  profiles = signal<any>([]);

  constructor() {
    this.profileService.getTestAccounts().subscribe((accounts) => {
      this.profiles.set(accounts);
    });
  }
}

