import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  @Input() usuario: any; //me traigo el usuario registrado desde protfolio.

  constructor(private ruta: Router, private porfolioService: PorfolioService) {}

  ngOnInit(): void {
    this.usuario.proyectos.sort(
      (a: any, b: any) => b.fin && b.fin.localeCompare(a.fin)
    );
  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-proyecto']);
  }
  irAPantallaEditar(idProyecto: any) {
    this.ruta.navigate(['/editar-proyecto', idProyecto]);
  }
  eliminarProyecto(idProyecto: BigInt) {
    Swal.fire({                                             //uso el sweetalert
      title: 'Atención',
      text: '¿Seguro desea eliminar este proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.porfolioService
          .eliminarProyecto(this.usuario.id, idProyecto)            //intento eliminar y espero confirmación
          .subscribe({
            next: (data) => {
              this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
              this.ruta.onSameUrlNavigation = 'reload';
              this.ruta.navigate([this.ruta.url]);
            },
            error: (err) => {                                     //error por si no se puede eliminar
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error',
              });
            },
          });
      }
    });
  }
}
