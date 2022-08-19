import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';

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
    const confirmacion = confirm('¿Seguro desea eliminar esta habilidad?');
    if(confirmacion){
      this.porfolioService.eliminarSkill(this.usuario.id, idSkill).subscribe( data =>{
        console.log(data);
        this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruta.onSameUrlNavigation = 'reload';
        this.ruta.navigate([this.ruta.url]);
        })
    }
  }
}
