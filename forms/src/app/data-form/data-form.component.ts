import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estado } from '../shared/models/estado';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  //estados!: Estado[];
  estados!: Observable<Estado[]>;
  cargos!: any[];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dropDownService: DropdownService, private consultaCepService: ConsultaCepService) { }

  ngOnInit(): void {

    this.estados = this.dropDownService.getEstados();

    this.cargos = this.dropDownService.getCargos();

    /*this.dropDownService.getEstados().subscribe(dados => {
      this.estados = dados; console.log(dados)
    });*/

    /*this.formulario = new FormGroup({
      nome: new FormControl('David'),
      email: new FormControl('david@email.com')
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({

        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null]
    });

  }

  onSubmit() {
    console.log(this.formulario.value);

    if (this.formulario.valid) {

      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .pipe(map(res => res))
        .subscribe((dados: any) => {
          console.log(dados);
          this.resetar();
        });

    } else {
      console.log('Formulário Inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) { //recursividade
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset(); //resetar os campos do formulário
  }

  verificaValidTouched(campo: any) {
    return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched;
  }

  verificarEmailInvalido() {
    let campoEmail: any = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: any) {
    return {
      'alert alert-danger': this.verificaValidTouched(campo)
    }
  }

  consultaCep() {

    let cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.consultaCepService.consultaCep(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarCargo() {
    const cargo = { nome: 'Desenvolvedor', nivel: 'Pleno', descricao: 'Desenvolvedor Pleno' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

}
