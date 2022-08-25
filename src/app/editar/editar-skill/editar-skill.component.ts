import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //, NgForm
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-skill',
  templateUrl: './editar-skill.component.html',
  styleUrls: ['./editar-skill.component.css'],
})
export class EditarSkillComponent implements OnInit {
  @Input() usuario: any;
  idSkill: any;
  skill: any;
  private sub: any;
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
      nombre: ['', Validators.required],
      porcentaje: ['', Validators.required],
    });
    this.loading = true;
  }

  //esto se puede usar para el editar
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.idSkill = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe({
      next: (data) => {
        this.porfolioService.obtenerUsuarioPorId(data.id).subscribe((data) => {
          this.usuario = data;

          this.usuario.skills.forEach((skill: { id: any }) => {
            if (skill.id == this.idSkill) {
              this.skill = skill;
              this.form.controls['nombre'].setValue(this.skill.nombre);
              this.form.controls['porcentaje'].setValue(this.skill.porcentaje);
            }
          });
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

  get Validacion() {
    return this.form.status == 'VALID';
  }
  get Nombre() {
    return this.form.get('nombre');
  }
  get Porcentaje() {
    return this.form.get('porcentaje');
  }

  editarSkill(event: Event) {
    event.preventDefault;

    this.mostrarSpinner = true;
    
    this.form.value.id = this.idSkill;
    this.porfolioService
      .editarSkill(this.usuario.id, this.form.value, this.idSkill)
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

  volverHome() {
    this.ruta.navigate(['/home']);
  }
}
