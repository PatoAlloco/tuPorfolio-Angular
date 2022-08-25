import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Input() usuario:any;
  idEducacion:any;
  educacion:any;
  private sub: any;

  constructor(private ruta:Router,
              private activatedRoute:ActivatedRoute,
              private porfolioService:PorfolioService ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.idEducacion = +params['id'];
    });

    this.usuario.estudios.forEach((est: { id: any; }) => {
      if (est.id == this.idEducacion) {
        this.educacion = est;
      }
    });

    this.usuario.estudios.sort((a:any,b:any) => b.fin && b.fin.localeCompare(a.fin));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-educacion']);
  }

  irAPantallaEditar(idEstudio:any) { 
    this.ruta.navigate(['/editar-educacion', idEstudio]);
  }

  eliminarEducacion(idEstudio:BigInt){
    Swal.fire({
      title: 'Atención',
      text: '¿Seguro desea eliminar este estudio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No',
    }).then((result) => {
      Swal.showLoading ()
      if (result.isConfirmed) {
        this.porfolioService
          .eliminarEducacion(this.usuario.id, idEstudio)
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
