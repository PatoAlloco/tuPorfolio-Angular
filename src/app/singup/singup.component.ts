import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from '../services/autentication.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  form:FormGroup;
  

  constructor(private formBuilder:FormBuilder, private autenticactionService:AutenticationService, 
    private ruta:Router) { 
    
    this.form = this.formBuilder.group({
      mail:['',[Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      deviceId: ["6561656"],
      deviceType: ["DEVICE_TYPE_ANDROID"],
      notificationToken: ["6565165651"]   //estos 3 no se que pingo son
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
  get Nombre(){
    return this.form.get('nombre');
  }
  get Apellido(){
    return this.form.get('apellido');
  }

  onEnviar(event:Event){
    event.preventDefault;
    this.autenticactionService.IniciarSesion(this.form.value).subscribe(data =>{
      this.ruta.navigate(['/home']);
    })
  }

}
