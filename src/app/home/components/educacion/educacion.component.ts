import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Input() usuario:any;


  constructor( private ruta:Router ) { }

  ngOnInit(): void {

  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-educacion']);
  }

  irAPantallaEditar(idEstudio:any) { 
    this.ruta.navigate(['/editar-educacion', idEstudio]);
  }
}
