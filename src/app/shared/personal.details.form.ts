import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

const form = {
  firstName: new FormControl('Denis', [
    Validators.required,
  ]),
  lastName: new FormControl('Zahariev', [
    Validators.required,
  ]),
  email: new FormControl('denis.zaharievv@gmail.com', [
    Validators.required,
    Validators.email
  ]),
  phoneNumber: new FormControl(undefined,[
    Validators.required,

  ]),
  discountCode: new FormControl('', [])
  };

@Injectable({ providedIn: 'root' })
export class PersonalDetailsForm extends FormGroup {
  constructor() {
    super(form);
  }
}