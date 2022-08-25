import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-skill',
  templateUrl: './agregar-skill.component.html',
  styleUrls: ['./agregar-skill.component.css'],
})
export class AgregarSkillComponent implements OnInit {
  @Input() usuario: any;

  form: FormGroup;
  loading:boolean;
  mostrarSpinner = false;
  
  constructor(
    private porfolioService: PorfolioService,
    private ruta: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      porcentaje: ['', Validators.required],
    });
    this.loading = true;
  }

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

  agregarSkill(event: Event) {
    event.preventDefault;
    this.mostrarSpinner = true;

    this.porfolioService
      .cargarSkill(this.usuario.id, this.form.value)
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

  get Validacion() {
    return this.form.status == 'VALID';
  }
  get Nombre() {
    return this.form.get('nombre');
  }
  get Porcentaje() {
    return this.form.get('porcentaje');
  }

  volverHome() {
    this.ruta.navigate(['/home']);
  }
}
