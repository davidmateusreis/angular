import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormCanDeactivate } from 'src/app/guards/form-candeactivate';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit, FormCanDeactivate {

  aluno: any;
  inscricao!: Subscription;
  private formMudou: boolean = false;

  constructor(private route: ActivatedRoute, private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);

        if (this.aluno === null) {
          this.aluno = {};
        }
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onInput() {
    this.formMudou = true;
    console.log('mudou');
  }

  podeMudarRota() {

    if (this.formMudou) {
      confirm('As alterações não serão salvas!');
    }

    return true;
  }

  podeDesativar() {
    return this.podeMudarRota();
  }

}
