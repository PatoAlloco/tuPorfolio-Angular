import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Input() usuario:any;
  idEducacion:any;
  educacion:any;
  private sub: any;

  

  constructor(private ruta:Router,
              private activatedRoute:ActivatedRoute,
              private porfolioService:PorfolioService ) { }

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
            // this.form.controls['instituto'].setValue(this.educacion.instituto);
            // this.form.controls['titulo'].setValue(this.educacion.titulo);
            // this.form.controls['inicio'].setValue(this.educacion.inicio);
            // this.form.controls['fin'].setValue(this.educacion.fin);
          }
        });
      })
    })

    const estudiosss = this.usuario.estudios;


  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  irAPantallaAgregar() {
    this.ruta.navigate(['/agregar-educacion']);
  }

  irAPantallaEditar(idEstudio:any) { 
    this.ruta.navigate(['/editar-educacion', idEstudio]);
  }

  eliminarEducacion(idEstudio:BigInt){
    const confirmacion = confirm('¿Seguro desea eliminar este estudio?');
    if(confirmacion){
      this.porfolioService.eliminarEducacion(this.usuario.id, idEstudio).subscribe( data =>{
        console.log(data);
        this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruta.onSameUrlNavigation = 'reload';
        this.ruta.navigate([this.ruta.url]);
        })
    }
  }
}
