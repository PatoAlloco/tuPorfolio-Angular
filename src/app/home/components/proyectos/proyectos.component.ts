import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @Input() usuario:any;
  
  constructor(private ruta:Router,
              private porfolioService:PorfolioService) { }

  ngOnInit(): void {

  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-proyecto']);
  }
  irAPantallaEditar(idProyecto:any) { 
    this.ruta.navigate(['/editar-proyecto', idProyecto]);
  }
  eliminarProyecto(idProyecto:BigInt){
    const confirmacion = confirm('¿Seguro desea eliminar este proyecto?');
    if(confirmacion){
      this.porfolioService.eliminarProyecto(this.usuario.id, idProyecto).subscribe( data =>{
        console.log(data);
        this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruta.onSameUrlNavigation = 'reload';
        this.ruta.navigate([this.ruta.url]);
        })
    }
  }
}
