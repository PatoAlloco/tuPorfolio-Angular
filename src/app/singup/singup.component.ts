import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PorfolioService } from '../services/porfolio.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent implements OnInit {
  form: FormGroup;
  mostrarSpinner: boolean;
  mailRepetido: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PorfolioService,
    private ruta: Router
  ) {
    this.mostrarSpinner = false;
    this.mailRepetido = false;
    this.form = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      passwordRepetida: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get Validacion() {
    return this.form.status == 'VALID' && this.validarPassword(this.form.value.passwordRepetida);
  }

  get Email() {
    return this.form.get('mail');
  }
  get Password() {
    return this.form.get('password');
  }
  get Nombre() {
    return this.form.get('nombre');
  }
  get Apellido() {
    return this.form.get('apellido');
  }
  get PasswordRepetida() {
    return this.form.get('passwordRepetida');
  }

  validarPassword(contra: String) {
    return contra == this.form.value.password;
  }

  irALogin() {
    this.ruta.navigate(['/login']);
  }

  onEnviar(event: Event) {
    this.mailRepetido = false;
    this.mostrarSpinner = true;
    event.preventDefault;
    this.portfolioService.crearUsuario(this.form.value).subscribe({
      next: (data) => {
        this.ruta.navigate(['/login']);
      },
      error: (err) => {       
        this.mostrarSpinner = false;
        if (err.status == 400) {
          this.mailRepetido = true;
        }
      },
    });
  }

}
