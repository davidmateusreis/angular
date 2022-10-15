import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];

  cursos$!: Observable<Curso[]>; //observable

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    //this.cursosService.list()
    //.subscribe((dados: any) => this.cursos = dados);
    this.cursos$ = this.cursosService.list();
  }

}
