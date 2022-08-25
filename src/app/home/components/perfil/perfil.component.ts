import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() usuario:any;

  fotoPerfil:any;
  fotoPortada:any;
  mostrar:boolean = false;

  constructor(private datosPorfolio:PorfolioService,
              private ruta:Router ) {  }

            

  ngOnInit(): void {
      this.mostrar = true  
    
    this.datosPorfolio.obtenerFotoPerfil(this.usuario.id).subscribe(data =>{
      if (data) {
        this.fotoPerfil = "data:" + data.mime + ";base64," + data.contenido;
      }
    })
    this.datosPorfolio.obtenerFotoPortada(this.usuario.id).subscribe(data =>{   
      if (data) {
        this.fotoPortada = "data:" + data.mime + ";base64," + data.contenido;
      }     
    })

  }
  
  irAPantallaEditar(idPerfil:any) { 
    this.ruta.navigate(['/editar-perfil', idPerfil]);
  }

  irAPantallaEditarFotoPerfil(idPerfil:any) { 
    this.ruta.navigate(['/editar-foto-perfil', idPerfil]);
  }
  irAPantallaEditarFotoPortada(idPerfil:any) { 
    this.ruta.navigate(['/editar-foto-portada', idPerfil]);
  }

  //para mostrar la edad pero al final no me gusto como quedo
  edad(){
    if (this.usuario.nacimiento) {      
    const today: Date = new Date();
    const birthDate: Date = new Date(this.usuario.nacimiento);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
    }
    return ''
  }
}
