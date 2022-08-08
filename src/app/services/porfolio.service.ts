import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {
  url:string = "http://localhost:8080/usuario/";
  usuario:any;

  constructor( private http:HttpClient) {   

  }

  obtenerDatos():Observable<any>{
    // return this.http.get('./assets/data/data.json');
    return this.http.get(this.url );
  }

  obtenerUsuarioPorId(id:BigInt):Observable<any>{    
    return this.http.get(this.url + id);
  }

  obtenerUsuarioLogueado():Observable<any>{
  return this.http.get(this.url + 'actual');
  }

  editarUsuario(id:BigInt, usuario:any):Observable<any>{
    return this.http.put(this.url + id, usuario); 
  }

  //=========FOTOS==========//
  cargarFotoPortada(id:BigInt, archivo:FormData):Observable<any>{
    return this.http.patch(this.url + id + '/foto-portada', archivo );
  }

  cargarFotoPerfil(id:BigInt, archivo:FormData):Observable<any>{
    return this.http.patch(this.url + id + '/foto-perfil', archivo );
  }

  obtenerFotoPortada(id:BigInt):Observable<any>{
    return this.http.get(this.url + id + '/foto-portada');
  }

  obtenerFotoPerfil(id:BigInt):Observable<any>{
    return this.http.get(this.url + id + '/foto-perfil');
  }

  //===========TRABAJOS============//
  cargarTrabajo(id:BigInt, trabajo:any):Observable<any>{
    return this.http.post(this.url + id + '/trabajo', trabajo);
  }
  editarTrabajo(id:BigInt, trabajo:any, idTrabajo:BigInt):Observable<any>{
    return this.http.put(this.url + id + '/trabajo/' + idTrabajo, trabajo);
  }
  eliminarTrabajo(id:BigInt, trabajo:any, idTrabajo:BigInt):Observable<any>{
    return this.http.delete(this.url + id + '/trabajo/' + idTrabajo, trabajo);
  }

  //===========EDUCACION=========//
  cargarEeducacion(id:BigInt, educacion:any):Observable<any>{
    return this.http.post(this.url + id + '/educacion', educacion);
  }
  editarEeducacion(id:BigInt, educacion:any, idEducacion:BigInt):Observable<any>{
    return this.http.put(this.url + id + '/educacion/' + idEducacion, educacion);
  }
  eliminarEeducacion(id:BigInt, educacion:any, idEducacion:BigInt):Observable<any>{
    return this.http.delete(this.url + id + '/educacion/' + idEducacion, educacion);
  }

  //===========PROYECTOS==========//
  cargarProyecto(id:BigInt, proyecto:any):Observable<any>{
    return this.http.post(this.url + id + '/proyecto', proyecto);
  }
  editarProyecto(id:BigInt, proyecto:any, idProyecto:BigInt):Observable<any>{
    return this.http.put(this.url + id + '/proyecto/' + idProyecto, proyecto);
  }
  eliminarProyecto(id:BigInt, proyecto:any, idProyecto:BigInt):Observable<any>{
    return this.http.delete(this.url + id + '/proyecto/' + idProyecto, proyecto);
  }

  //============SKILLS=============//
  cargarSkill(id:BigInt, skill:any):Observable<any>{
    return this.http.post(this.url + id + '/softskill', skill);
  }
  editarSkill(id:BigInt, skill:any, idSkill:BigInt):Observable<any>{
    return this.http.put(this.url + id + '/softskill/' + idSkill, skill);
  }
  eliminarSkill(id:BigInt, skill:any, idSkill:BigInt):Observable<any>{
    return this.http.delete(this.url + id + '/softskill/' + idSkill, skill);
  }
}
