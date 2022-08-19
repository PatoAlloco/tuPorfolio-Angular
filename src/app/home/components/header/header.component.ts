import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private datosPorfolio:PorfolioService,
              private ruta:Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    const confirmacion = confirm('¿Seguro desea cerrar sesión?');
    console.log("cerrar sesion");
    
    if(confirmacion){
      // sessionStorage.removeItem('token')
      this.ruta.navigate(['/login'])
    }
  }
}
