import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosGuard } from './guards/alunos.guard';
import { AuthGuard } from './guards/auth-guard';
import { CursosGuard } from './guards/cursos.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( //lazyloading 1º passo
      mod => mod.CursosModule
    ), canActivate: [AuthGuard], canActivateChild: [CursosGuard]
  },
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(
      mod => mod.AlunosModule
    ), canActivate: [AuthGuard], canActivateChild: [AlunosGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //forRoot só na raíz
  exports: [RouterModule]
})
export class AppRoutingModule { }
