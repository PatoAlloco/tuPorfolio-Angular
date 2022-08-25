import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //, NgForm
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css'],
})
export class EditarProyectoComponent implements OnInit {
  @Input() usuario: any;
  idProyecto: any;
  proyecto: any;
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
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.idProyecto = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe({
      next: (data) => {
        this.porfolioService.obtenerUsuarioPorId(data.id).subscribe((data) => {
          this.usuario = data;
          this.loading = false;

          setTimeout(() => {
            this.usuario.proyectos.forEach((pro: { id: any }) => {
              if (pro.id == this.idProyecto) {
                this.proyecto = pro;
                this.form.controls['titulo'].setValue(this.proyecto.titulo);
                this.form.controls['descripcion'].setValue(
                  this.proyecto.descripcion
                );
                this.form.controls['linkRepositorio'].setValue(
                  this.proyecto.linkRepositorio
                );
                this.form.controls['inicio'].setValue(this.proyecto.inicio);
                this.form.controls['fin'].setValue(this.proyecto.fin);
              }
            });
          }, 50);
        });
      },
      error: (err) => {
        if (err.status == 401) {
          this.authenticationService.Logout(); //
          this.ruta.navigate(['/login']);
        }
        this.loading = false;
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editarProyecto(event: Event) {
    event.preventDefault;
    this.mostrarSpinner = true;

    this.form.value.id = this.idProyecto;
    this.porfolioService
      .editarProyecto(this.usuario.id, this.form.value, this.idProyecto)
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
