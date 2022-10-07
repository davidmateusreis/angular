import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form: any) {
    console.log(form);

    //console.log(this.usuario);
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))//converte json em string
      .pipe(map(res => res))
      .subscribe((dados: any) => console.log(dados));
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo: { valid: any; touched: any; }) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: { valid: any; touched: any; }) {
    return {
      'alert alert-danger': this.verificaValidTouched(campo)
    }
  }

  consultaCep(cep: any, form: any) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm(form); //Reseta os campos do formulário

        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    /*formulario.setValue({
      nome: formulario.value.nome,
  email: formulario.value.email,
  endereco: {
    cep: dados.cep,
    numero: '',
    complemento: dados.complemento,
    rua: dados.logradouro,
    bairro: dados.bairro,
    cidade: dados.localidade,
    estado: dados.uf
  }
    });*/

    formulario.form.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
