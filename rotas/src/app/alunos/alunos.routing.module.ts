import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlunosDeactivateGuard } from "../guards/alunos-deactivate.guard";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { AlunosComponent } from "./alunos.component";

const alunosRoutes: Routes = [
    {
        path: '', component: AlunosComponent, children: [ //rotas filhas
            { path: 'novo', component: AlunoFormComponent },
            { path: ':id', component: AlunoDetalheComponent },
            { path: ':id/editar', component: AlunoFormComponent, canDeactivate: [AlunosDeactivateGuard] }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})
export class AlunosRoutingModule { }