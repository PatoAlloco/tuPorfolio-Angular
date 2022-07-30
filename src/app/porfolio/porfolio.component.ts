import { Component, OnInit } from '@angular/core';
import { InterceptorService } from '../services/interceptor.service';
import { PorfolioService } from '../services/porfolio.service';

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit {

  constructor(private porfolioService:PorfolioService, private interceptorService:InterceptorService) { }

  ngOnInit(): void {
    this.porfolioService.obtenerUsuarioLogueado().subscribe(data =>{
      this.porfolioService.obtenerUsiarioPorId(data.getId());
    });
    

  }


  
}
