import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-agregar-trabajo',
  templateUrl: './agregar-trabajo.component.html',
  styleUrls: ['./agregar-trabajo.component.css']
})
export class AgregarTrabajoComponent implements OnInit {
  @Input() usuario:any;

  form:FormGroup;

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder) { 
      
      this.form = this.formBuilder.group({
          empresa   : ['', Validators.required],
          puesto    : ['', Validators.required],
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

  agregarTrabajo(event:Event){
    event.preventDefault;

    this.porfolioService.cargarTrabajo(this.usuario.id, this.form.value).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);
    })
  }

  volverHome(){
    this.ruta.navigate(['/home']);
  }
}
