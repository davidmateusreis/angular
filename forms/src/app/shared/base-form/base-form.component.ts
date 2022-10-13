import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: ''
})
export abstract class BaseFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit(): any;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('Formulário Inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) { //recursividade
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
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

  verificaRequired(campo: any) {
    return this.formulario.get(campo)?.hasError('required') && this.formulario.get(campo)?.touched;
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

}
