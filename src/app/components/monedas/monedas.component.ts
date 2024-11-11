import { Component, OnInit } from '@angular/core';
import { MonedaDTO } from 'src/app/models/moneda-dto.model';
import { MonedasService } from 'src/app/services/monedas/monedas.service';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent implements OnInit {
  monedas: MonedaDTO[] = [];
  nuevaMoneda: MonedaDTO = { id_moneda: 0, nombre_moneda: '', simbolo: '' };
  monedaEditar: MonedaDTO | null = null;
  constructor(private monedasService: MonedasService) { }

  ngOnInit(): void {
    this.cargarMonedas();
  }
  cargarMonedas(): void {
    this.monedasService.getMonedas().subscribe(
      (response) => {
        this.monedas = response;
      },
      (error) => {
        console.error('Error al cargar las monedas', error);
      }
    );
  }

  registrarMoneda(): void {
    this.monedasService.crearMoneda(this.nuevaMoneda).subscribe(
      () => {
        console.log('Moneda registrada con éxito');
        this.cargarMonedas();  // Recargar las monedas
        this.nuevaMoneda = { id_moneda: 0, nombre_moneda: '', simbolo: '' };  // Limpiar formulario
      },
      (error) => {
        console.error('Error al registrar la moneda', error);
      }
    );
  }

  eliminarMoneda(id: number): void {
    this.monedasService.eliminarMoneda(id).subscribe(
      () => {
        console.log('Moneda eliminada con éxito');
        this.cargarMonedas();  // Recargar las monedas
      },
      (error) => {
        console.error('Error al eliminar la moneda', error);
      }
    );
  }

  editarMoneda(moneda: MonedaDTO): void {
    this.monedaEditar = { ...moneda };  // Clonar la moneda para editar
  }

  actualizarMoneda(): void {
    if (this.monedaEditar) {
      this.monedasService.modificarMoneda(this.monedaEditar.id_moneda, this.monedaEditar).subscribe(
        () => {
          console.log('Moneda modificada con éxito');
          this.cargarMonedas();  // Recargar las monedas
          this.monedaEditar = null;  // Limpiar el formulario de edición
        },
        (error) => {
          console.error('Error al modificar la moneda', error);
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.monedaEditar = null;  // Cancelar la edición
  }
}
