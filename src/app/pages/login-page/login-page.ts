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
  auth = inject(Auth);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  onSubmit() {
    console.log("Form value:", this.form.value);

    this.auth.login(
      this.form.value.username!, this.form.value.password!)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/']);
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
    });
  }
}
