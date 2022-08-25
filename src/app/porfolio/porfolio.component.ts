import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/autentication.service';
import { PorfolioService } from '../services/porfolio.service';

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css'],
})
export class PorfolioComponent implements OnInit {
  usuario: any;
  loading: boolean;
  constructor(
    private porfolioService: PorfolioService,
    private authenticationService: AuthenticationService,
    private ruta: Router
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.porfolioService.obtenerUsuarioLogueado().subscribe({
      next: (data) => {
        this.porfolioService.obtenerUsuarioPorId(data.id).subscribe((data) => {
          this.usuario = data;
          this.loading = false;
        });
      },
      error: (err) => {
        if (err.status == 401) {
          this.authenticationService.Logout();     //seguridad para redirigir al login sin token
          this.ruta.navigate(['/login']);
        }
        this.loading = false;
      },
    });
  }
}
