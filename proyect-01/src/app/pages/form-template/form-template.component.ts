import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  constructor() { }

  inputValidations: Validators = [Validators.required, Validators.minLength(8), Validators.maxLength(16)];

  username: FormControl = new FormControl('', this.inputValidations);
  password: FormControl = new FormControl('', this.inputValidations);
  age: FormControl = new FormControl('');
  cellphone: FormControl = new FormControl('');
  email: FormControl = new FormControl('');
  date: FormControl = new FormControl('2022-04-12');
  timeHour: FormControl = new FormControl('00:00:00');
  dateTime: FormControl = new FormControl('2022-04-12T00:00:00');
  color: FormControl = new FormControl('#ffffff');
  audioRange: FormControl = new FormControl('100');
  sizeRange: FormControl = new FormControl('50');
  genderCheck: FormControl = new FormControl('');
  genderRadius: FormControl = new FormControl('');
  file: FormControl = new FormControl('');
  select: FormControl = new FormControl('none');
  multipleSelect: FormControl = new FormControl('none');
  radio: FormControl = new FormControl('');
  check: FormControl = new FormControl('');


  ngOnInit(): void {
  }

}
