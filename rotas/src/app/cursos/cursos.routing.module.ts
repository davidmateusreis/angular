import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosComponent } from './cursos.component';

const cursosRoutes: Routes = [
    { path: 'cursos/naoEncontrado', component: CursoNaoEncontradoComponent }, //tudo que for hardcoded colocar antes do dinâmico
    { path: ':id', component: CursoDetalheComponent },
    { path: '', component: CursosComponent }, //lazyloading 1º passo
];

@NgModule({
    imports: [RouterModule.forChild(cursosRoutes)], //forChild no que não for raíz
    exports: [RouterModule]
})
export class CursosRoutingModule { }