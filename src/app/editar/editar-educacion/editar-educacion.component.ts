import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //, NgForm
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css'],
})
export class EditarEducacionComponent implements OnInit {
  @Input() usuario: any;
  idEducacion: any;
  educacion: any;
  private sub: any;
  fechaActual: Date = new Date();
  form: FormGroup;
  loading: boolean;
  mostrarSpinner: boolean;

  constructor(
    private porfolioService: PorfolioService,
    private ruta: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.mostrarSpinner = false;
    this.form = this.formBuilder.group({
      instituto: ['', Validators.required],
      titulo: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: [''],
    });
    this.loading = true;
  }

  //esto se puede usar para el editar
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.idEducacion = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe({
      next: (data) => {
        this.porfolioService.obtenerUsuarioPorId(data.id).subscribe((data) => {
          this.usuario = data;
          this.loading = false;

          setTimeout(() => {
            this.usuario.estudios.forEach((est: { id: any }) => {
              if (est.id == this.idEducacion) {
                this.educacion = est;
                this.form.controls['instituto'].setValue(
                  this.educacion.instituto
                );
                this.form.controls['titulo'].setValue(this.educacion.titulo);
                this.form.controls['inicio'].setValue(this.educacion.inicio);
                this.form.controls['fin'].setValue(this.educacion.fin);
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

  editarEducacion(event: Event) {
    this.mostrarSpinner = true;
    event.preventDefault;

    this.form.value.id = this.idEducacion;
    this.porfolioService
      .editarEducacion(this.usuario.id, this.form.value, this.idEducacion)
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
          })
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
  get Instituto() {
    return this.form.get('instituto');
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
