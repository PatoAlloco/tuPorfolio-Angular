import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  mostrarSpinner: boolean;
  noLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticactionService: AuthenticationService,
    private ruta: Router) {
    
      this.mostrarSpinner = false;
      this.noLogin = false;
      this.form = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get Validacion() {
    return this.form.status == 'VALID';
  }

  get Email() {
    return this.form.get('mail');
  }
  get Password() {
    return this.form.get('password');
  }

  irARegistro() {
    this.ruta.navigate(['/registro']);
  }

  onEnviar(event: Event) {
    this.mostrarSpinner = true;
    this.mostrarSpinner = false;
    event.preventDefault;
    this.authenticactionService.IniciarSesion(this.form.value).subscribe({  
      next: (data) => {
        this.mostrarSpinner = false;
        this.ruta.navigate(['/home']);
      },
      error: (err) => {
        this.mostrarSpinner = false;

        if (err.status == 401) {  //error de falta de token
          this.noLogin = true;   //muestro mensaje de mail o password incorrecto
        }
      },
    });
  }
}
