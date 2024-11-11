import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service'; // Ajusta la ruta según tu estructura
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  usuarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  login(): void {
    if (this.usuarioForm.valid) {
      this.authService.login(this.usuarioForm.value).subscribe(
        (authResponse) => {
          // Guardar el token en localStorage
          localStorage.setItem('token', authResponse.token);
          // Redirigir al navbar
          this.router.navigate(['/menu']);
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
          // Manejar el error, mostrar un mensaje al usuario
        }
      );
    }
  }
  navigateToRegister(): void {
    this.router.navigate(['/register']); // Redirigir al componente de registro
  }

}
