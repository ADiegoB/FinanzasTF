import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
interface AuthResponse {
 
  id_usuario: number;       // ID del usuario
  nombre_usuario: string;    // Nombre del usuario
  clave: string;             // Clave (aunque no suele enviarse en la respuesta de autenticación)
  token: string; 
}
interface CredentialsDTO {
  nombre: string;
  clave: string;
}
interface RegisterDTO {
  nombre_usuario: string;
  clave: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiURL = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: CredentialsDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiURL, credentials).pipe(
      tap(authResult => {
        this.setSession(authResult);
      }),
      catchError(error => {
        console.error('Error en el inicio de sesión', error);
        return throwError(error); // Lanza el error para que pueda ser manejado en el componente
      })
    );
  }
  registerUser(user: RegisterDTO): Observable<AuthResponse> {
    // Asegúrate de que la URL coincida con la del backend
    return this.http.post<AuthResponse>('http://localhost:8080/api/auth/usuarios/register', user);
  }

  // Método para guardar el token en localStorage
  setSession(authResult: AuthResponse): void {
    localStorage.setItem('token', authResult.token); // Guardar el token en localStorage
    localStorage.setItem('userId', authResult.id_usuario.toString()); // Guardar el ID de usuario

  }
  getToken(): string | null {
    return localStorage.getItem('token'); // Recuperar el token desde localStorage
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Retorna true si hay un token, false si no
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    localStorage.removeItem('userId'); // Elimina el ID de usuario
    this.router.navigate(['/login']);
  }
}
