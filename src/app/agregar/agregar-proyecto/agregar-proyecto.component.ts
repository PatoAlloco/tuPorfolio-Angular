import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css'],
})
export class AgregarProyectoComponent implements OnInit {
  @Input() usuario: any;
  fechaActual: Date = new Date();

  form: FormGroup;
  loading: boolean;
  mostrarSpinner = false;

  constructor(
    private porfolioService: PorfolioService,
    private ruta: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      linkRepositorio: [''],
      inicio: ['', Validators.required],
      fin: [''],
    });
    this.loading = true;
  }

  //esto se puede usar para el editar
  ngOnInit(): void {
    this.porfolioService.obtenerUsuarioLogueado().subscribe({
      next: (data) => {
        this.porfolioService.obtenerUsuarioPorId(data.id).subscribe((data) => {
          this.usuario = data;
        });
        this.loading = false;
      },
      error: (err) => {
        if (err.status == 401) {
          this.authenticationService.Logout();
          this.ruta.navigate(['/login']);
        }
        this.loading = false;
      },
    });
  }

  agregarProyecto(event: Event) {
    event.preventDefault;
    this.mostrarSpinner = true;

    this.porfolioService
      .cargarProyecto(this.usuario.id, this.form.value)
      .subscribe({
        next: () => {
          this.mostrarSpinner = false;
          this.ruta.navigate(['/home']);
        },
        error: () => {
          this.mostrarSpinner = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error',
          });
        },
      });
  }

  validarFechaActual(fecha: string) {
    if (!fecha) {
      return true;
    }
    return new Date(fecha) < this.fechaActual;
  }

  validarFechas() {
    if (!this.form.value.fin || !this.form.value.inicio) {
      return true;
    }
    return new Date(this.form.value.fin) >= new Date(this.form.value.inicio);
  }

  get Validacion() {
    return (
      this.form.status == 'VALID' &&
      this.validarFechaActual(this.form.value.fin) &&
      this.validarFechaActual(this.form.value.inicio) &&
      this.validarFechas()
    );
  }
  get Descripcion() {
    return this.form.get('descripcion');
  }
  get Titulo() {
    return this.form.get('titulo');
  }
  get Inicio() {
    return this.form.get('inicio');
  }

  volverHome() {
    this.ruta.navigate(['/home']);
  }
}
