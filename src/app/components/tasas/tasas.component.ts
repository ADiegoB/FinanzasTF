import { Component, OnInit } from '@angular/core';
import { TasaDTO } from 'src/app/models/tasa-dto.model';
import { TasasService } from 'src/app/services/tasas/tasas.service';

@Component({
  selector: 'app-tasas',
  templateUrl: './tasas.component.html',
  styleUrls: ['./tasas.component.css']
})
export class TasasComponent implements OnInit {
  tasas: TasaDTO[] = [];
  nuevaTasa: TasaDTO = { id_tasa: 0, valor: 0, tipo_tasa: '' };
  tasaEditar: TasaDTO | null = null;

  constructor(private tasasService: TasasService) { }

  ngOnInit(): void {
    this.cargarTasas();
  }
  cargarTasas(): void {
    this.tasasService.getTasas().subscribe(
      (response) => {
        this.tasas = response;
      },
      (error) => {
        console.error('Error al cargar las tasas', error);
      }
    );
  }

  registrarTasa(): void {
    this.tasasService.crearTasa(this.nuevaTasa).subscribe(
      () => {
        console.log('Tasa registrada con éxito');
        this.cargarTasas();  // Recargar las tasas
        this.nuevaTasa = { id_tasa: 0, valor: 0, tipo_tasa: '' };  // Limpiar formulario
      },
      (error) => {
        console.error('Error al registrar la tasa', error);
      }
    );
  }

  eliminarTasa(id: number): void {
    this.tasasService.eliminarTasa(id).subscribe(
      () => {
        console.log('Tasa eliminada con éxito');
        this.cargarTasas();  // Recargar las tasas
      },
      (error) => {
        console.error('Error al eliminar la tasa', error);
      }
    );
  }

  editarTasa(tasa: TasaDTO): void {
    this.tasaEditar = { ...tasa };  // Clonar la tasa para editar
  }

  actualizarTasa(): void {
    if (this.tasaEditar) {
      this.tasasService.modificarTasa(this.tasaEditar.id_tasa, this.tasaEditar).subscribe(
        () => {
          console.log('Tasa modificada con éxito');
          this.cargarTasas();  // Recargar las tasas
          this.tasaEditar = null;  // Limpiar el formulario de edición
        },
        (error) => {
          console.error('Error al modificar la tasa', error);
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.tasaEditar = null;  // Cancelar la edición
  }
}
