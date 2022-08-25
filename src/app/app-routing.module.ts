import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PorfolioComponent } from './porfolio/porfolio.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { LoginGuard } from './services/guard.guard';

import { AgregarEducacionComponent } from './agregar/agregar-educacion/agregar-educacion.component';
import { EditarEducacionComponent } from './editar/editar-educacion/editar-educacion.component';
import { AgregarProyectoComponent } from './agregar/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './editar/editar-proyecto/editar-proyecto.component';
import { AgregarSkillComponent } from './agregar/agregar-skill/agregar-skill.component';
import { EditarSkillComponent } from './editar/editar-skill/editar-skill.component';
import { AgregarTrabajoComponent } from './agregar/agregar-trabajo/agregar-trabajo.component';
import { EditarTrabajoComponent } from './editar/editar-trabajo/editar-trabajo.component';
import { EditarPerfilComponent } from './editar/editar-perfil/editar-perfil.component';
import { EditarFotoPerfilComponent } from './editar/editar-foto-perfil/editar-foto-perfil.component';
import { EditarFotoPortadaComponent } from './editar/editar-foto-portada/editar-foto-portada.component';


const routes: Routes = [
  {path:'home', component:PorfolioComponent, canActivate:[LoginGuard]},//aca protejo el home si no hay token
  {path:'login', component:LoginComponent},
  {path:'registro', component:SingupComponent},

  {path:'agregar-educacion', component:AgregarEducacionComponent},
  {path:'agregar-proyecto', component:AgregarProyectoComponent},
  {path:'agregar-skill', component:AgregarSkillComponent},
  {path:'agregar-trabajo', component:AgregarTrabajoComponent},

  {path:'editar-educacion/:id', component:EditarEducacionComponent},
  {path:'editar-proyecto/:id', component:EditarProyectoComponent},
  {path:'editar-skill/:id', component:EditarSkillComponent},
  {path:'editar-trabajo/:id', component:EditarTrabajoComponent},
  {path:'editar-perfil/:id', component:EditarPerfilComponent},
  {path:'editar-foto-perfil/:id', component:EditarFotoPerfilComponent},
  {path:'editar-foto-portada/:id', component:EditarFotoPortadaComponent},
  
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
