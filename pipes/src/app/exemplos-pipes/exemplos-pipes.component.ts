import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent implements OnInit {

  console: any = {
    nome: 'Nintendo Switch',
    dataLancamento: new Date('2017, 3, 3'),
    preco: '299.00',
    fabricante: 'Nintendo',
    url: 'https://www.nintendo.com',
    vendas: '111.000.000'
  };

  livros: string[] = ['Angular', 'Java'];

  filtro: string = '';

  addCurso(valor: any) {
    this.livros.push(valor);
    console.log(this.livros);
  }

  obterCursos() {

    if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === '') {
      return this.livros;
    }
    return this.livros.filter((v) => {
      if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    })
  }

  constructor() { }

  ngOnInit(): void {
  }

}
