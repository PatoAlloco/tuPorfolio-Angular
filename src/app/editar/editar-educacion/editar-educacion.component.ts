import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent implements OnInit {
  @Input() usuario:any;
  idEducacion:any;
  educacion:any;
  private sub: any;

  form:FormGroup;

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { 

      this.form = this.formBuilder.group({
          instituto : ['', Validators.required],
          titulo    : ['', Validators.required],
          inicio    : ['', Validators.required],
          fin       : ['']
      });
  }


  //esto se puede usar para el editar
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.idEducacion = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe( data =>{
      this.porfolioService.obtenerUsuarioPorId(data.id).subscribe(data => {
        this.usuario = data;

        this.usuario.estudios.forEach((est: { id: any; }) => {
          if (est.id == this.idEducacion) {
            this.educacion = est;
            this.form.controls['instituto'].setValue(this.educacion.instituto);
            this.form.controls['titulo'].setValue(this.educacion.titulo);
            this.form.controls['inicio'].setValue(this.educacion.inicio);
            this.form.controls['fin'].setValue(this.educacion.fin);
          }
        });

      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editarEducacion(event:Event){
    event.preventDefault;

    this.form.value.id = this.idEducacion;
    this.porfolioService.editarEeducacion(this.usuario.id, this.form.value, this.idEducacion).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);
    })
  }

  volverHome(){
    this.ruta.navigate(['/home']);
  
  }
}
