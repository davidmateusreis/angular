import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, Observable, Subject, switchMap } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
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

  cursoSelecionado!: Curso;

  //bsModalRef!: BsModalRef; //modal
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  constructor(
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService) { }

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
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.bsModalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.cursosService.remove(this.cursoSelecionado.id)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
          this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
