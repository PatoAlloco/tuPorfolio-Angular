import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './autentication.service';
import { AuthModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) { 

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth:AuthModel = this.authenticationService.UsuarioAutenticado;

    if (auth && auth.token){
      const clonedRequest = req.clone({
        headers: new HttpHeaders({
              Authorization: auth.token,
            })
        });
  
        return next.handle(clonedRequest);
    }
        
    return next.handle(req);
  }

}
