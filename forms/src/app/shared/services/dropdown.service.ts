import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<Estado[]>('assets/dados/estados.json').pipe();
  }

  getCargos() {
    return [
      { nome: 'Desenvolvedor', nivel: 'Junior', descricao: 'Desenvolvedor Júnior' },
      { nome: 'Desenvolvedor', nivel: 'Pleno', descricao: 'Desenvolvedor Pleno' },
      { nome: 'Desenvolvedor', nivel: 'Senior', descricao: 'Desenvolvedor Sênior' }
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', descricao: 'Java' },
      { nome: 'javascript', descricao: 'JavaScript' },
      { nome: 'php', descricao: 'PHP' },
      { nome: 'ruby', descricao: 'Ruby' }
    ];
  }

  getNewsletter() {
    return [
      { valor: 's', descricao: 'Sim' },
      { valor: 'n', descricao: 'Não' }
    ];
  }
}
