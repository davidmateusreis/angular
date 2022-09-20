import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosModule } from './cursos/cursos.module';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { MeuSegundoComponent } from './meu-segundo/meu-segundo.component';

@NgModule({
  declarations: [ //componentes, diretivas e pipes
    AppComponent,
    MeuPrimeiroComponent,
    MeuSegundoComponent //importação da classe
  ],
  imports: [ //modulos
    BrowserModule,
    AppRoutingModule,
    CursosModule
  ],
  providers: [], //serviços com escopo global
  bootstrap: [AppComponent]
})
export class AppModule { }
