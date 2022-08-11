import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-agregar-skill',
  templateUrl: './agregar-skill.component.html',
  styleUrls: ['./agregar-skill.component.css']
})
export class AgregarSkillComponent implements OnInit {
  @Input() usuario:any;

  form:FormGroup;

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder) { 
      
      this.form = this.formBuilder.group({
          nombre    : ['', Validators.required],
          porcentaje: ['', Validators.required]
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

  agregarSkill(event:Event){
    event.preventDefault;



    this.porfolioService.cargarSkill(this.usuario.id, this.form.value).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);
    })
  }

  volverHome(){
    this.ruta.navigate(['/home']);
  }
}
