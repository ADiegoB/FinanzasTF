import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonedaDTO } from 'src/app/models/moneda-dto.model';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {
  private apiUrl = `http://localhost:8080/api/auth/monedas`;
  constructor(private http: HttpClient) { }
  getMonedas(): Observable<MonedaDTO[]> {
    return this.http.get<MonedaDTO[]>(`${this.apiUrl}/get`);
  }

  // Obtener una moneda por su id
  getMoneda(id: number): Observable<MonedaDTO> {
    return this.http.get<MonedaDTO>(`${this.apiUrl}/${id}`);
  }

  // Registrar una nueva moneda
  crearMoneda(moneda: MonedaDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, moneda);
  }

  // Modificar una moneda existente
  modificarMoneda(id: number, moneda: MonedaDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, moneda);
  }

  // Eliminar una moneda por su id
  eliminarMoneda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
