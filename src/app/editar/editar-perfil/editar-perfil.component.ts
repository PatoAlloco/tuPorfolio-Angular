import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  @Input() usuario:any;
  idUsuario:any;
  perfil:any;
  private sub: any;

  form:FormGroup;

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { 

      this.form = this.formBuilder.group({
          nombre    : ['', Validators.required],
          apellido  : ['', Validators.required],
          mail      : ['', Validators.required],
          ocupacion : ['', Validators.required],
          sobreMi   : ['', Validators.required],
          nacimiento: ['', Validators.required],
          ciudad    : ['', Validators.required],
          provincia : ['', Validators.required]
      });
  }


  //esto se puede usar para el editar
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.idUsuario = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe( data =>{
      this.porfolioService.obtenerUsuarioPorId(data.id).subscribe(data => {
        this.usuario = data;

        console.log(new Date(this.usuario.nacimiento));
        

        this.form.controls['nombre'].setValue(this.usuario.nombre);
        this.form.controls['apellido'].setValue(this.usuario.apellido);
        this.form.controls['mail'].setValue(this.usuario.mail);
        this.form.controls['ocupacion'].setValue(this.usuario.ocupacion);
        this.form.controls['sobreMi'].setValue(this.usuario.sobreMi);
        this.form.controls['nacimiento'].setValue(new Date(this.usuario.nacimiento));
        this.form.controls['ciudad'].setValue(this.usuario.ciudad);
        this.form.controls['provincia'].setValue(this.usuario.provincia);

      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editarPerfil(event:Event){
    event.preventDefault;

    this.form.value.id = this.idUsuario;
    this.porfolioService.editarUsuario(this.idUsuario, this.form.value).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);
    })
  }


  volverHome(){
    this.ruta.navigate(['/home']);
  
  }
}
