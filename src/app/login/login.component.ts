import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from '../services/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder, 
              private autenticactionService:AutenticationService, 
              private ruta:Router) {

    this.form = this.formBuilder.group({
      mail:['',[Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
    })

  }

  ngOnInit(): void {
  }

  get Email(){
    return this.form.get('mail');
  }
  get Password(){
    return this.form.get('password');
  }

  onEnviar(event:Event){
    event.preventDefault;
    this.autenticactionService.IniciarSesion(this.form.value).subscribe(data =>{
      
      this.ruta.navigate(['/home']);
    })
  }
}
