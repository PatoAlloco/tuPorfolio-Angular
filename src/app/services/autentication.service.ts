import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthModel } from '../models/usuario.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = "http://localhost:8080/login";
  currentUserSubject: BehaviorSubject<AuthModel>; //observable con el token que viene de usuario.models

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthModel>(JSON.parse(sessionStorage.getItem('currentUser') || '{}')); //carga el token y sino hay queda vacio    
  }

  IniciarSesion(credenciales:any):Observable<any>{
    let auth:AuthModel;
    let token:any; 

    return this.http.post(this.url,  credenciales, {observe: 'response'}).pipe(map(data =>{
      if (data.headers.get('Authorization') !== null) {
        token = data.headers.get('Authorization')
      }
      
      auth = new AuthModel(token);
      sessionStorage.setItem('currentUser', JSON.stringify(auth));
      this.currentUserSubject.next(auth);
      return data;
    }))
  }

  get UsuarioAutenticado(){
    return this.currentUserSubject.value;
  }
  
  Logout(){
    sessionStorage.removeItem('currentUser')
    this.currentUserSubject = new BehaviorSubject<AuthModel>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));    
  }

}
