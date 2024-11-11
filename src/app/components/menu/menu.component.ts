import { Component, OnInit } from '@angular/core';
import { CarterasService } from '../../services/carteras/carteras.service'; // Asegúrate de que esta ruta sea correcta
import { CarteraDTO } from 'src/app/models/cartera-dto.model';
import { UsuarioDTO } from 'src/app/models/usuario-dto.model';
import { TasaDTO } from 'src/app/models/tasa-dto.model';
import { MonedaDTO } from 'src/app/models/moneda-dto.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) { }

  irAComponent(componente: string): void {
    switch (componente) {
      case 'tasas':
        this.router.navigate(['/tasa']);
        break;
      case 'monedas':
        this.router.navigate(['/moneda']);
        break;
      case 'carteras':
        this.router.navigate(['/cartera']);
        break;
      default:
        break;
    }
  }
 
}
