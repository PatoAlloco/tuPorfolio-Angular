import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-softskills',
  templateUrl: './softskills.component.html',
  styleUrls: ['./softskills.component.css']
})
export class SoftskillsComponent implements OnInit {
  @Input() usuario:any;
  
  constructor(private ruta:Router,
              private porfolioService:PorfolioService) { }

  ngOnInit(): void {

  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-skill']);
  }

  irAPantallaEditar(idSkill:any) { 
    this.ruta.navigate(['/editar-skill', idSkill]);
  }

  eliminarSkill(idSkill:BigInt){
    Swal.fire({
      title: 'Atención',
      text: '¿Seguro desea eliminar este soft skill?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.porfolioService
          .eliminarSkill(this.usuario.id, idSkill)
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
