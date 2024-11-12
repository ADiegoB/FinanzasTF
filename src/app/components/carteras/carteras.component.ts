import { Component, OnInit } from '@angular/core';
import { CarterasService } from '../../services/carteras/carteras.service'; // Asegúrate de que esta ruta sea correcta
import { CarteraDTO } from 'src/app/models/cartera-dto.model';
import { UsuarioDTO } from 'src/app/models/usuario-dto.model';
import { TasaDTO } from 'src/app/models/tasa-dto.model';
import { MonedaDTO } from 'src/app/models/moneda-dto.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-carteras',
  templateUrl: './carteras.component.html',
  styleUrls: ['./carteras.component.css']
})
export class CarterasComponent implements OnInit {
  carteras: any[] = [];
  usuarios: UsuarioDTO[] = [];
  tasas: TasaDTO[] = [];
  monedas: MonedaDTO[] = [];
  carteraEditar: CarteraDTO | null = null;
  nuevaCartera = {
    nombre_cartera: '',
    fecha_descuento: '' as string | null,
    id_usuario: null,
    id_tasa: null,
    id_moneda: null
  };
  mostrarFormulario: boolean = false;
  constructor(private carteraService: CarterasService, private datePipe: DatePipe, private router: Router,private location: Location) { }

  ngOnInit(): void {
    this.loadCarteras();
    this.loadUsuarios();
    this.loadTasas();
    this.loadMonedas();
  }
  loadCarteras(): void {
    this.carteraService.getCarteras().subscribe(
      response => {
        this.carteras = response;
      },
      error => {
        console.error('Error al cargar carteras', error);
      }
    );
  }
  retroceder() {
    this.location.back();
  }
  loadUsuarios(): void {
    this.carteraService.getUsuarios().subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }

  loadTasas(): void {
    this.carteraService.getTasas().subscribe(
      response => {
        this.tasas = response;
      },
      error => {
        console.error('Error al cargar tasas', error);
      }
    );
  }
  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  loadMonedas(): void {
    this.carteraService.getMonedas().subscribe(
      response => {
        this.monedas = response;
      },
      error => {
        console.error('Error al cargar monedas', error);
      }
    );
  }

  // Mostrar el formulario para registrar una nueva cartera
  mostrarFormularioRegistro(): void {
    this.mostrarFormulario = true;
  }

  // Registrar la nueva cartera
  registrarCartera(): void {
    const fechaFormateada = this.datePipe.transform(this.nuevaCartera.fecha_descuento, 'dd-MM-yyyy');
    this.nuevaCartera.fecha_descuento = fechaFormateada;  // Asignar la fecha formateada

    this.carteraService.crearCartera(this.nuevaCartera).subscribe(
      response => {
        console.log('Cartera registrada con éxito', response);
        this.loadCarteras(); // Recargar las carteras
        this.mostrarFormulario = false; // Cerrar el formulario
      },
      error => {
        console.error('Error al registrar la cartera', error);
      }
    );
  }
  verFacturas(idCartera: number): void {
    this.router.navigate(['/cartera', idCartera]); // Redirigir al componente Factura con el ID de la cartera
  }
  eliminarCartera(idCartera: number): void {
    this.carteraService.eliminarCartera(idCartera).subscribe(
      response => {
        console.log('Cartera eliminada con éxito', response);
        this.loadCarteras(); // Recargar las carteras
      },
      error => {
        console.error('Error al eliminar la cartera', error);
      }
    );
  }

  editarCartera(cartera: CarteraDTO): void {
    this.carteraEditar = { ...cartera };  // Clonar la moneda para editar
  }


  actualizarCartera(): void {
    if (this.carteraEditar) {
      this.carteraService.modificarCartera(this.carteraEditar.id_cartera, this.carteraEditar).subscribe(
        () => {
          console.log('Cartera modificada con éxito');
          this.loadCarteras();  // Recargar las monedas
          this.carteraEditar = null;  // Limpiar el formulario de edición
        },
        (error) => {
          console.error('Error al modificar la moneda', error);
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.carteraEditar = null;  // Cancelar la edición
  }

}
