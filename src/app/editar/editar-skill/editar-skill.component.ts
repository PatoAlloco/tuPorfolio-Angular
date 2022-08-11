import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-editar-skill',
  templateUrl: './editar-skill.component.html',
  styleUrls: ['./editar-skill.component.css']
})
export class EditarSkillComponent implements OnInit {
  @Input() usuario:any;
  idSkill:any;
  skill:any;
  private sub: any;

  form:FormGroup;

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { 

      this.form = this.formBuilder.group({
          nombre    : ['', Validators.required],
          porcentaje: ['', Validators.required]
      });
  }


  //esto se puede usar para el editar
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.idSkill = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe( data =>{
      this.porfolioService.obtenerUsuarioPorId(data.id).subscribe(data => {
        this.usuario = data;

        this.usuario.skills.forEach((sky: { id: any; }) => {
          if (sky.id == this.idSkill) {
            this.skill = sky;
            this.form.controls['nombre'].setValue(this.skill.nombre);
            this.form.controls['titulo'].setValue(this.skill.porcentaje);
          }
        });

      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editarSkill(event:Event){
    event.preventDefault;

    this.form.value.id = this.idSkill;
    this.porfolioService.editarSkill(this.usuario.id, this.form.value, this.idSkill).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);
    })
  }

  volverHome(){
    this.ruta.navigate(['/home']);
  
  }
}
