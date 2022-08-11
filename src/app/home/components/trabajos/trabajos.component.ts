import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {
  @Input() usuario:any;

  constructor(private ruta:Router) {  }

  ngOnInit(): void {

  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-trabajo']);
  }

  irAPantallaEditar(idTrabajo:any) { 
    this.ruta.navigate(['/editar-trabajo', idTrabajo]);
  }
}
