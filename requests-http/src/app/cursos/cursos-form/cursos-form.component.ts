import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    /*this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const curso$ = this.cursosService.loadById(id); //curso$ = observable
        curso$.subscribe(curso => {
          this.updateForm(curso);
        });
      }
    );*/

    this.route.params //no caso das rotas, o angular faz unsubscribe automatico
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.cursosService.loadById(id)), //cancela os requests anteriores e retorna o valor do último
        //switchMap(cursos => obterAulas)
      )
      .subscribe(curso => this.updateForm(curso));

    //no concatMap a ordem do request importa
    //no mergeMap a ordem do request não importa
    //no exhaustMap em casos de login

    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.cursosService.create(this.form.value).subscribe(
        success => {
          this.alertModalService.showAlertSuccess('Curso criado com sucesso!');
          this.location.back(); //volta para rota anterior a rota do formulário
        },
        error => this.alertModalService.showAlertDanger('Erro ao criar curso, tente novamente.'),
        () => console.log('request completo')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    //console.log('cancel');
  }

}
