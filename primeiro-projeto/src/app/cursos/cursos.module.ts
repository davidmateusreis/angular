import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';



@NgModule({
  declarations: [
    CursosComponent,
    CursoDetalheComponent //adicionado automaticamente
  ],
  imports: [
    CommonModule //disponibiliza diretivas e pipes comuns
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
