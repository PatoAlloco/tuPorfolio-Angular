import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticationService } from './autentication.service';
import { AuthModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private autenticationService:AutenticationService) { 

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth:AuthModel = this.autenticationService.UsuarioAutenticado;

    if (auth && auth.token){
      const  clonedRequest = req.clone({
        headers: new HttpHeaders({
              Authorization: auth.token,
              "Content-Type": "application/json"
            })
        });
  
        return next.handle(clonedRequest);
    }
        
    return next.handle(req);
  }

}
