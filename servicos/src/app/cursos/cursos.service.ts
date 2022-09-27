import { EventEmitter, Injectable } from "@angular/core";

import { LogService } from "../shared/log.service";

@Injectable()
export class CursosService {

    emitirCursoCriado = new EventEmitter<string>();
    static criouNovoCurso = new EventEmitter<string>(); //static não depende da instância da classe para acesso

    private cursos: string[] = ['Angular', 'Java', 'Spring'];

    constructor(private logService: LogService) {
        console.log('CursosService');
    }

    getCursos() {
        this.logService.consoleLog('Obtendo lista de cursos');
        return this.cursos;
    }

    addCurso(curso: string) {
        this.logService.consoleLog(`Criando um novo curso com nome de ${curso}`);
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }
}