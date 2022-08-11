import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-editar-trabajo',
  templateUrl: './editar-trabajo.component.html',
  styleUrls: ['./editar-trabajo.component.css']
})
export class EditarTrabajoComponent implements OnInit {
  @Input() usuario:any;
  idTrabajo:any;
  trabajo:any;
  private sub: any;

  form:FormGroup;

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { 

      this.form = this.formBuilder.group({
          empresa: ['', Validators.required],
          puesto : ['', Validators.required],
          inicio : ['', Validators.required],
          fin    : ['']
      });
  }


  //esto se puede usar para el editar
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.idTrabajo = +params['id'];
    });

    this.porfolioService.obtenerUsuarioLogueado().subscribe( data =>{
      this.porfolioService.obtenerUsuarioPorId(data.id).subscribe(data => {
        this.usuario = data;

        this.usuario.trabajos.forEach((tra: { id: any; }) => {
          if (tra.id == this.idTrabajo) {
            this.trabajo = tra;
            this.form.controls['empresa'].setValue(this.trabajo.empresa);
            this.form.controls['puesto'].setValue(this.trabajo.puesto);
            this.form.controls['inicio'].setValue(this.trabajo.inicio);
            this.form.controls['fin'].setValue(this.trabajo.fin);
          }
        });

      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editarTrabajo(event:Event){
    event.preventDefault;

    this.form.value.id = this.idTrabajo;
    this.porfolioService.editarTrabajo(this.usuario.id, this.form.value, this.idTrabajo).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);
    })
  }

  volverHome(){
    this.ruta.navigate(['/home']);
  
  }
}
