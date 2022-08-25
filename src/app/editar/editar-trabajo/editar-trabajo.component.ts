import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-trabajo',
  templateUrl: './editar-trabajo.component.html',
  styleUrls: ['./editar-trabajo.component.css'],
})
export class EditarTrabajoComponent implements OnInit {
  @Input() usuario: any;
  idTrabajo: any;
  trabajo: any;
  private sub: any;
  fechaActual: Date = new Date();
  loading: boolean;
  form: FormGroup;
  mostrarSpinner = false;
  constructor(
    private porfolioService: PorfolioService,
    private ruta: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      empresa: ['', Validators.required],
      puesto: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: [''],
    });
    this.loading = true;
  }

  //esto se puede usar para el editar
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.idTrabajo = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe({
      next: (data) => {
        this.porfolioService.obtenerUsuarioPorId(data.id).subscribe((data) => {
          this.usuario = data;
          this.loading = false;

          setTimeout(() => {
            this.usuario.trabajos.forEach((tra: { id: any }) => {
              if (tra.id == this.idTrabajo) {
                this.trabajo = tra;
                this.form.controls['empresa'].setValue(this.trabajo.empresa);
                this.form.controls['puesto'].setValue(this.trabajo.puesto);
                this.form.controls['inicio'].setValue(this.trabajo.inicio);
                this.form.controls['fin'].setValue(this.trabajo.fin);
              }
            });
          }, 50);
        });
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editarTrabajo(event: Event) {
    event.preventDefault;
    this.mostrarSpinner = true;
    this.form.value.id = this.idTrabajo;
    this.porfolioService
      .editarTrabajo(this.usuario.id, this.form.value, this.idTrabajo)
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

  get Empresa() {
    return this.form.get('empresa');
  }
  get Puesto() {
    return this.form.get('puesto');
  }
  get Inicio() {
    return this.form.get('inicio');
  }

  volverHome() {
    this.ruta.navigate(['/home']);
  }
}
