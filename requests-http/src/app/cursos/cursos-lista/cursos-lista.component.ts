import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, Observable, Subject, switchMap } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
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

  bsModalRef!: BsModalRef; //modal

  constructor(private cursosService: CursosService, private bsModalService: BsModalService) { }

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
          //this.error$.next(true);
          this.handleError();
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

  handleError() {
    this.bsModalRef = this.bsModalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

}
