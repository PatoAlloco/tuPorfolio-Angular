import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/autentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-foto-portada',
  templateUrl: './editar-foto-portada.component.html',
  styleUrls: ['./editar-foto-portada.component.css'],
})
export class EditarFotoPortadaComponent implements OnInit {
  @Input() usuario: any;
  idUsuario: any;
  perfil: any;
  foto: any = null;
  private sub: any;
  loading:boolean;
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
      file: ['', Validators.required],
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  seleccionFoto(event: any) {
    this.foto = null;

    const file: File = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      this.foto = {
        file: file,
      };
    });
    fileReader.readAsDataURL(file);
  }

  editarFotoPortada() {
    this.mostrarSpinner = true;
    
    let fd = new FormData();
    fd.append('archivo', this.foto.file);

    this.porfolioService.cargarFotoPortada(this.idUsuario, fd).subscribe({
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

  volverHome() {
    this.ruta.navigate(['/home']);
  }
}
