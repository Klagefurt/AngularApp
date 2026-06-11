import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { delay, from, map, skip, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private auth = inject(Auth);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  onSubmit() {
    if (this.form.invalid) {
      alert('Please fill in all required fields with valid data.');
      return;
    }

    this.auth.login(
      this.form.value.username!,
      this.form.value.password!
    ).subscribe({
      next: (isSuccess) => {
        if (isSuccess) {
          this.router.navigate(['/']);
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('An error occurred during login. Please try again later.');
      }
    });
  }
}
