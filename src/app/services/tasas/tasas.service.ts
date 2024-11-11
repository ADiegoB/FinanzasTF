import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TasaDTO } from 'src/app/models/tasa-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TasasService {
  private apiUrl = 'http://localhost:8080/api/auth/tasas'
  constructor(private http: HttpClient) { }
   // Obtener todas las tasas
  getTasas(): Observable<TasaDTO[]> {
    return this.http.get<TasaDTO[]>(`${this.apiUrl}/get`);
  }

  // Obtener una tasa por su id
  getTasa(id: number): Observable<TasaDTO> {
    return this.http.get<TasaDTO>(`${this.apiUrl}/${id}`);
  }

  // Registrar una nueva tasa
  crearTasa(tasa: TasaDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, tasa);
  }

  // Modificar una tasa existente
  modificarTasa(id: number, tasa: TasaDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tasa);
  }

  // Eliminar una tasa por su id
  eliminarTasa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
