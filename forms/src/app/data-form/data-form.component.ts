import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { empty, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormValidations } from '../shared/formValidations';
import { Estado } from '../shared/models/estado';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  estados!: Observable<Estado[]>;
  cargos!: any[];
  tecnologias!: any[];
  newsletterOptions!: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private verificarEmailService: VerificaEmailService
  ) {
    super();
  }

  override ngOnInit(): void {

    this.estados = this.dropDownService.getEstados();

    this.cargos = this.dropDownService.getCargos();

    this.tecnologias = this.dropDownService.getTecnologias();

    this.newsletterOptions = this.dropDownService.getNewsletter();

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], this.validarEmail.bind(this)], //validação assíncrona
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({

        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP', value)),
        switchMap(status => status === 'VALID' ?
          this.consultaCepService.consultaCep(this.formulario.get('endereco.cep')?.value) : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
  }

  submit() {
    console.log(this.formulario.value);

    let valueSubmit = Object.assign({}, this.formulario.value); //copiando valores do formulário

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: null) => v !== null)
    });

    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .pipe(map(res => res))
      .subscribe((dados: any) => {
        console.log(dados);
        this.resetar();
      });
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

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php', 'ruby']);
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  validarEmail(formControl: FormControl) {
    return this.verificarEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

}
