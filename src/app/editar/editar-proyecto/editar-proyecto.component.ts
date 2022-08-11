import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  @Input() usuario:any;
  idProyecto:any;
  proyecto:any;
  private sub: any;

  form:FormGroup;

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { 

      this.form = this.formBuilder.group({
          titulo         : ['', Validators.required],
          descripcion    : ['', Validators.required],
          linkRepositorio: [''],
          inicio         : ['', Validators.required],
          fin            : ['']
      });
  }


  //esto se puede usar para el editar
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.idProyecto = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe( data =>{
      this.porfolioService.obtenerUsuarioPorId(data.id).subscribe(data => {
        this.usuario = data;

        this.usuario.proyectos.forEach((pro: { id: any; }) => {
          if (pro.id == this.idProyecto) {
            this.proyecto = pro;
            this.form.controls['titulo'].setValue(this.proyecto.titulo);
            this.form.controls['descripcion'].setValue(this.proyecto.descripcion);
            this.form.controls['linkRepositorio'].setValue(this.proyecto.linkRepositorio);
            this.form.controls['inicio'].setValue(this.proyecto.inicio);
            this.form.controls['fin'].setValue(this.proyecto.fin);
          }
        });

      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editarProyecto(event:Event){
    event.preventDefault;

    this.form.value.id = this.idProyecto;
    this.porfolioService.editarProyecto(this.usuario.id, this.form.value, this.idProyecto).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);      
    })
  }

  volverHome(){
    this.ruta.navigate(['/home']);
  
  }
}
