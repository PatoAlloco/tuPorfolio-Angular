import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-agregar-educacion',
  templateUrl: './agregar-educacion.component.html',
  styleUrls: ['./agregar-educacion.component.css']
})
export class AgregarEducacionComponent implements OnInit {
  @Input() usuario:any;

  form:FormGroup;
  
  educacion = {
    fechaInicio: new Date()
  }

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder) { 
      
      this.form = this.formBuilder.group({
          instituto : ['', Validators.required],
          titulo    : ['', Validators.required],
          inicio    : ['', Validators.required],
          fin       : ['']
      });
  }


  //esto se puede usar para el editar
  ngOnInit(): void {
    this.porfolioService.obtenerUsuarioLogueado().subscribe( data =>{
      this.porfolioService.obtenerUsuarioPorId(data.id).subscribe(data => {
        this.usuario = data;
      })
    })
  }

  agregarEducacion(event:Event){
    event.preventDefault;

    this.porfolioService.cargarEeducacion(this.usuario.id, this.form.value).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);
    })
  }

  volverHome(){
    this.ruta.navigate(['/home']);
  }
}
