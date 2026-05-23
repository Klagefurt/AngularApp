import { Component, input } from '@angular/core';
import { UserProfile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-profile-card',
  imports: [],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  profile = input.required<UserProfile>();
}
