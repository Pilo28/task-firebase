import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => {
          console.error('Error during registration:', error);
          alert('Error al registrarse. Intenta nuevamente.');
        }
      });
    }
  }
}
