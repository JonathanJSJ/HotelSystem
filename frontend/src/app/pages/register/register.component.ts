import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('error');
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this.authService.register(name, email, password).subscribe({
      next: (response) => {
        alert('Registration completed successfully!');
        this.authService.setToken(response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert(error.error?.message || 'Registration failed');
      },
    });
  }

  canDeactivate(): boolean {
    if (this.registerForm.dirty && !this.submitted) {
      return window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
    }
    return true;
  }
}
