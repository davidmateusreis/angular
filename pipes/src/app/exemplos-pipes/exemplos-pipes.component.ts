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

  constructor() { }

  ngOnInit(): void {
  }

}
