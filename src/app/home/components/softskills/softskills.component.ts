import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-softskills',
  templateUrl: './softskills.component.html',
  styleUrls: ['./softskills.component.css']
})
export class SoftskillsComponent implements OnInit {
  @Input() usuario:any;
  
  constructor(private ruta:Router) { }

  ngOnInit(): void {

  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-skill']);
  }

  irAPantallaEditar(idSkill:any) { 
    this.ruta.navigate(['/editar-skill', idSkill]);
  }

}
