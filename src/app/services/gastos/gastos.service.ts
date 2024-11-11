import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GastoDTO } from 'src/app/models/gasto-dto.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private baseUrl = 'http://localhost:8080/api/auth/gastos';
  private url = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) { }

    // Obtener gastos por id de factura
    getGastosByFacturaId(idFactura: number): Observable<GastoDTO[]> {
      return this.http.get<GastoDTO[]>(`${this.baseUrl}/factura/${idFactura}`);
    }
  
    crearGasto(idFactura: number, gasto: GastoDTO): Observable<GastoDTO> {
      const url = `${this.url}/facturas/${idFactura}/gastos`;
      return this.http.post<GastoDTO>(url, gasto);
    }
  
    // Modificar un gasto existente
    modificarGasto(idGasto: number, gasto: GastoDTO): Observable<GastoDTO> {
      return this.http.put<GastoDTO>(`${this.baseUrl}/actualizar/${idGasto}`, gasto);
    }
  
    // Eliminar un gasto
    eliminarGasto(idGasto: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/eliminar/${idGasto}`);
    }
}
