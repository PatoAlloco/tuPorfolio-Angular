import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PorfolioComponent } from './porfolio/porfolio.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  {path:'home', component:PorfolioComponent/*, canActivate:[GuardGuard]*/},//aca protejo el home si no hay token
  {path:'login', component:LoginComponent},
  {path:'registro', component:SingupComponent},
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
