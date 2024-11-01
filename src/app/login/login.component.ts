import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../common/service/auth.service';

import { Router } from '@angular/router';
import { ToasterService } from '../common/service/toaster.service';
import { SpinnerService } from '../common/service/spinner.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  resetForm: FormGroup;
  showLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService,
    private spinner: SpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  showForgotPassFields() {
    this.showLogin = false;
    this.resetForm.reset();
  }

  showLoginFields() {
    this.showLogin = true;
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    const { email, password } = this.loginForm.value;
    this.authService
      .loginWithEmail(email, password)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (data) => {
          localStorage.setItem('uid', data.user?.uid || '');
          this.router.navigate(['core']);
        },
        error: () => {
          this.toasterService.showError('Invalid Credentials.');
        },
      });
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      return;
    }
    this.spinner.show();
    const { email } = this.resetForm.value;
    this.authService
      .resetPassword(email)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: () => {
          this.showLogin = true;
          this.toasterService.showSuccess('Password reset link sent.');
        },
        error: () => {
          this.toasterService.showError('Email is not registered.');
        },
      });
  }
}
