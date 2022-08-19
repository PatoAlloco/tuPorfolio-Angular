import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {
  @Input() usuario:any;

  constructor(private ruta:Router,
              private porfolioService:PorfolioService) {  }

  ngOnInit(): void {

  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-trabajo']);
  }

  irAPantallaEditar(idTrabajo:any) { 
    this.ruta.navigate(['/editar-trabajo', idTrabajo]);
  }

  eliminarTrabajo(idTrabajo:BigInt){
    const confirmacion = confirm('¿Seguro desea eliminar esta experiencia laboral?');
    if(confirmacion){
      this.porfolioService.eliminarTrabajo(this.usuario.id, idTrabajo).subscribe( data =>{
        console.log(data);
        this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruta.onSameUrlNavigation = 'reload';
        this.ruta.navigate([this.ruta.url]);
        })
    }
  }
}

