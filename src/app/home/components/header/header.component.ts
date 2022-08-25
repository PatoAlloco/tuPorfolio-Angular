import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private ruta: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  cerrarSesion() {
    Swal.fire({
      title: 'Atención',
      text: '¿Seguro desea cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.Logout();
        this.ruta.navigate(['/login']);
      }
    });
  }
}
