import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( //lazyloading 1º passo
      mod => mod.CursosModule
    )
  },
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(
      mod => mod.AlunosModule
    )
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //forRoot só na raíz
  exports: [RouterModule]
})
export class AppRoutingModule { }
