import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    //, NgForm

@Component({
  selector: 'app-editar-foto-perfil',
  templateUrl: './editar-foto-perfil.component.html',
  styleUrls: ['./editar-foto-perfil.component.css']
})
export class EditarFotoPerfilComponent implements OnInit {
  @Input() usuario:any;
  idUsuario:any;
  perfil:any;
  foto:any = null;
  private sub: any;

  form:FormGroup;

  constructor(private porfolioService:PorfolioService,
              private ruta:Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { 

      this.form = this.formBuilder.group({
          file   : ['', Validators.required],
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
      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  seleccionFoto(event:any){
    this.foto = null;

    const file:File = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      this.foto = {
        "file": file
      }  
    });
   fileReader.readAsDataURL(file);  
  }

  editarFotoPerfil(){
    let fd = new FormData();
    fd.append("archivo", this.foto.file);

    this.porfolioService.cargarFotoPerfil(this.idUsuario, fd).subscribe( data =>{
      console.log(this.form.value);
      this.ruta.navigate(['/home']);
    },
    error => {
      console.log(error);
    })
  }

  volverHome(){
    this.ruta.navigate(['/home']);
  
  }
}
