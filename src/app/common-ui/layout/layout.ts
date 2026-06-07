import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../sidebar/sidebar";
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Sidebar
],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  profileService = inject(ProfileService);

  ngOnInit() {
    console.log('ngOnInit');
    this.profileService.getMyProfile().subscribe(profile => {
      console.log('My profile:', profile);
    });
  }

}
