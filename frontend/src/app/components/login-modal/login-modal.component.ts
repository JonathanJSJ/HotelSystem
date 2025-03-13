import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<void>();

  loginForm: FormGroup;
  submitted = false;
  loginError: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loginError = null;

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: () => this.handleLoginError(),
    });
  }

  private handleLoginSuccess(response: any) {
    if (response.token) {
      this.authService.setToken(response.token);
      this.closeLogin();
    } else {
      this.loginError = 'Internal error. Please try again later.';
    }
  }

  private handleLoginError() {
    this.loginError = 'Invalid email or password. Please try again.';
  }

  closeLogin() {
    this.close.emit();
  }

  goToRegister() {
    this.router.navigate(['/register']);
    this.close.emit();
  }
}
