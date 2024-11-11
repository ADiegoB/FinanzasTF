import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacturaDTO } from 'src/app/models/factura-dto.model';
@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private apiURL = 'http://localhost:8080/api/auth/facturas';
  private reg = 'http://localhost:8080/api/auth/facturas/register';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getFacturas(): Observable<any[]> {
    const token = this.authService.getToken(); // Obtener el token desde AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiURL, { headers }); // Realizar la solicitud GET
  }
  getFacturasByCartera(idCartera: number): Observable<FacturaDTO[]> {
    return this.http.get<FacturaDTO[]>(`${this.apiURL}/cartera/${idCartera}`);
  }
  crearFactura(factura: any): Observable<any> {
    const url = this.reg;  // URL para crear una nueva factura
    return this.http.post<any>(url, factura);
  }

    // Método para modificar una factura
    modificarFactura(factura: FacturaDTO, id: number): Observable<any> {
      return this.http.put<any>(`${this.apiURL}/modificar/${id}`, factura);
    }
  
    // Método para eliminar una factura
    eliminarFactura(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiURL}/eliminar/${id}`);
    }
}
