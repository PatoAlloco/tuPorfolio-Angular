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
  
  constructor(private datosPorfolio:PorfolioService,
              private ruta:Router) { }

  ngOnInit(): void {

  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-proyecto']);
  }
  irAPantallaEditar(idProyecto:any) { 
    this.ruta.navigate(['/editar-proyecto', idProyecto]);
  }
}
