import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //, NgForm
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  @Input() usuario: any;
  idUsuario: any;
  perfil: any;
  private sub: any;
  fechaActual: Date = new Date();
  form: FormGroup;
  loading: boolean;
  mostrarSpinner = false;

  constructor(
    private porfolioService: PorfolioService,
    private ruta: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.required],
      ocupacion: ['', Validators.required],
      sobreMi: ['', Validators.required],
      nacimiento: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
    });
    this.loading = true;
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.idUsuario = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe({
      next: (data) => {
        this.porfolioService.obtenerUsuarioPorId(data.id).subscribe((data) => {
          this.usuario = data;
          this.setForm();
          this.loading = false;
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

  setForm() {
    setTimeout(() => {
      this.form.controls['nombre'].setValue(this.usuario.nombre);
      this.form.controls['apellido'].setValue(this.usuario.apellido);
      this.form.controls['mail'].setValue(this.usuario.mail);
      this.form.controls['ocupacion'].setValue(this.usuario.ocupacion);
      this.form.controls['sobreMi'].setValue(this.usuario.sobreMi);
      this.form.controls['nacimiento'].setValue(new Date(this.usuario.nacimiento));
      this.form.controls['ciudad'].setValue(this.usuario.ciudad);
      this.form.controls['provincia'].setValue(this.usuario.provincia);
    }, 50);
  }

  editarPerfil(event: Event) {
    event.preventDefault;
    this.mostrarSpinner = true;

    this.form.value.id = this.idUsuario;
    this.porfolioService
      .editarUsuario(this.idUsuario, this.form.value)
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
      this.validarFechaActual(this.form.value.nacimiento) &&
      this.validarFechas()
    );
  }
  get Nombre() {
    return this.form.get('nombre');
  }
  get Apellido() {
    return this.form.get('apellido');
  }
  get Mail() {
    return this.form.get('mail');
  }
  get Ocupacion() {
    return this.form.get('ocupacion');
  }
  get SobreMi() {
    return this.form.get('sobreMi');
  }
  get Nacimiento() {
    return this.form.get('nacimiento');
  }
  get Ciudad() {
    return this.form.get('ciudad');
  }
  get Provincia() {
    return this.form.get('provincia');
  }

  volverHome() {
    this.ruta.navigate(['/home']);
  }
}
