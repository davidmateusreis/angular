import { Component, OnInit } from '@angular/core';
import { catchError, empty, Observable, Subject, switchMap } from 'rxjs';
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
  error$ = new Subject<boolean>(); //emite valores

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    //this.cursosService.list()
    //.subscribe((dados: any) => this.cursos = dados);
    this.onRefresh();

  }

  onRefresh() {
    this.cursos$ = this.cursosService.list()
      .pipe(
        //map(),
        //tap(),
        //switchMap(),
        catchError(error => { //sempre colocar como último operador do pipe
          console.error(error);
          this.error$.next(true);
          return empty();
        })
      );

    this.cursosService.list()
      .pipe(
        catchError(error => empty())
      ).subscribe(
        dados => {
          console.log(dados);
        }/*,
        error => console.error(error),
        () => console.log('Observable completo!')*/
      );
  }

}
