import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarteraDTO } from 'src/app/models/cartera-dto.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarterasService {
  private apiURL = 'http://localhost:8080/api/auth/carteras/get';
  private reg = 'http://localhost:8080/api/auth/carteras/register';
  private usuariosURL = 'http://localhost:8080/api/auth/usuarios'; // Suponiendo que este es el endpoint para usuarios
  private tasasURL = 'http://localhost:8080/api/auth/tasas/get'; // Suponiendo que este es el endpoint para tasas
  private monedasURL = 'http://localhost:8080/api/auth/monedas/get'; // Suponiendo que este es el endpoint para monedas
  private baseUrl = 'http://localhost:8080/api/auth/carteras';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCarteras(): Observable<any[]> {
    const token = this.authService.getToken(); // Obtener el token desde AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiURL, { headers }); // Realizar la solicitud GET
  }
  getTotalesCartera(idCartera: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idCartera}/totales`);
  }
  
  getUsuarios(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.usuariosURL, { headers });
  }

  // Obtener tasas
  getTasas(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.tasasURL, { headers });
  }

  // Obtener monedas
  getMonedas(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.monedasURL, { headers });
  }

  // Crear una nueva cartera
  crearCartera(cartera: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.reg, cartera, { headers });
  }

  eliminarCartera(idCartera: number): Observable<void> {

    return this.http.delete<void>(`${this.baseUrl}/eliminar/${idCartera}`);
  }

  modificarCartera(idCartera: number, cartera: CarteraDTO): Observable<void> {

    return this.http.put<void>(`${this.baseUrl}/${idCartera}`, cartera);
  }
}
