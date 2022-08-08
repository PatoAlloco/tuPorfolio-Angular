import { Component, OnInit } from '@angular/core';
import { PorfolioService } from '../services/porfolio.service';

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit {
  idUsuario:any;
  usuario:any;

  constructor(private porfolioService:PorfolioService) {}

  ngOnInit(): void {
    this.porfolioService.obtenerUsuarioLogueado().subscribe( data =>{
      this.idUsuario = data.id
      this.porfolioService.obtenerUsuarioPorId(this.idUsuario).subscribe(data => {
        this.usuario = data;
      })
    })
  }
}
