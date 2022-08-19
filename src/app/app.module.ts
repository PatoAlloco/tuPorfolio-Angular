import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './home/components/header/header.component';
import { PerfilComponent } from './home/components/perfil/perfil.component';
import { TrabajosComponent } from './home/components/trabajos/trabajos.component';
import { EducacionComponent } from './home/components/educacion/educacion.component';
import { SoftskillsComponent } from './home/components/softskills/softskills.component';
import { ProyectosComponent } from './home/components/proyectos/proyectos.component';
import { FooterComponent } from './home/components/footer/footer.component';
import { PorfolioService } from './services/porfolio.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PorfolioComponent } from './porfolio/porfolio.component';
import { AppRoutingModule } from './app-routing.module';
import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './services/interceptor.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarEducacionComponent } from './editar/editar-educacion/editar-educacion.component';
import { AgregarEducacionComponent } from './agregar/agregar-educacion/agregar-educacion.component';
import { AgregarProyectoComponent } from './agregar/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './editar/editar-proyecto/editar-proyecto.component';
import { AgregarSkillComponent } from './agregar/agregar-skill/agregar-skill.component';
import { EditarSkillComponent } from './editar/editar-skill/editar-skill.component';
import { AgregarTrabajoComponent } from './agregar/agregar-trabajo/agregar-trabajo.component';
import { EditarTrabajoComponent } from './editar/editar-trabajo/editar-trabajo.component';
import { EditarPerfilComponent } from './editar/editar-perfil/editar-perfil.component';
import { EditarFotoPerfilComponent } from './editar/editar-foto-perfil/editar-foto-perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PerfilComponent,
    TrabajosComponent,
    EducacionComponent,
    SoftskillsComponent,
    ProyectosComponent,
    FooterComponent,
    PorfolioComponent,
    SingupComponent,
    LoginComponent,
    EditarEducacionComponent,
    AgregarEducacionComponent,
    AgregarProyectoComponent,
    EditarProyectoComponent,
    AgregarSkillComponent,
    EditarSkillComponent,
    AgregarTrabajoComponent,
    EditarTrabajoComponent,
    EditarPerfilComponent,
    EditarFotoPerfilComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    NgbModule,
    FormsModule
  ],
  providers: [PorfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
