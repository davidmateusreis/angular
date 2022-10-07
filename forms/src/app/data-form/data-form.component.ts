import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    /*this.formulario = new FormGroup({
      nome: new FormControl('David'),
      email: new FormControl('david@email.com')
    });*/

    this.formulario = this.formBuilder.group({
      nome: ['David'],
      email: ['david@email.com']
    });

  }

}
