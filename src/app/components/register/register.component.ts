import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      clave: ['', Validators.required],
      // Puedes agregar más campos según sea necesario, como email, etc.
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']); // Redirigir al login después de registrarse
        },
        (error) => {
          console.error('Error al registrar:', error);
          // Manejar el error, mostrar un mensaje al usuario
        }
      );
    }
  }

}
