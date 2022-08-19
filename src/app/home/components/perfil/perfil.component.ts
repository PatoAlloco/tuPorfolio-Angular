import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() idUsuario:any;

  miPorfolio:any;
  fotoPerfil:any;
  fotoPortada:any;

  mostrar:boolean = false;

  constructor(private datosPorfolio:PorfolioService,
              private ruta:Router ) {  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerUsuarioPorId(this.idUsuario).subscribe(data =>{
      this.miPorfolio = data;   
      this.mostrar = true  
    });
    
    this.datosPorfolio.obtenerFotoPerfil(this.idUsuario).subscribe(data =>{
      this.fotoPerfil = "data:" + data.mime + ";base64," + data.contenido;
    })
    this.datosPorfolio.obtenerFotoPortada(this.idUsuario).subscribe(data =>{    
      this.fotoPortada = "data:" + data.mime + ";base64," + data.contenido;
    })

  }
  
  irAPantallaEditar(idPerfil:any) { 
    this.ruta.navigate(['/editar-perfil', idPerfil]);
  }

  irAPantallaEditarFotoPerfil(idPerfil:any) { 
    this.ruta.navigate(['/editar-foto-perfil', idPerfil]);
  }
}
