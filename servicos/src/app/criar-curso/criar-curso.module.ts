import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { CursosService } from '../cursos/cursos.service';
import { CriarCursoComponent } from './criar-curso.component';

@NgModule({
  declarations: [
    CriarCursoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [CriarCursoComponent], //expõe o componente para outro módulos
  //providers: [CursosService]
})
export class CriarCursoModule { }
