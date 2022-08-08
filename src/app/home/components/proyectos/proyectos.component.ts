import { Component, Input, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @Input() usuario:any;
  
  constructor(private datosPorfolio:PorfolioService) { }

  ngOnInit(): void {

  }

}
