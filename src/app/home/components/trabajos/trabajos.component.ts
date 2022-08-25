import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css'],
})
export class TrabajosComponent implements OnInit {
  @Input() usuario: any;

  constructor(private ruta: Router, private porfolioService: PorfolioService) {}

  ngOnInit(): void {
    this.usuario.trabajos.sort(
      (a: any, b: any) => b.fin && b.fin.localeCompare(a.fin)
    );
  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-trabajo']);
  }

  irAPantallaEditar(idTrabajo: any) {
    this.ruta.navigate(['/editar-trabajo', idTrabajo]);
  }

  eliminarTrabajo(idTrabajo: BigInt) {
    Swal.fire({
      title: 'Atención',
      text: '¿Seguro desea eliminar este trabajo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.porfolioService
          .eliminarTrabajo(this.usuario.id, idTrabajo)
          .subscribe({
            next: () => {
              this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
              this.ruta.onSameUrlNavigation = 'reload';
              this.ruta.navigate([this.ruta.url]);
            },
            error: () => {
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
