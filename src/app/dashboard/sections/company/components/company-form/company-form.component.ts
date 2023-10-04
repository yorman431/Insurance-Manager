import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Company} from '../../company';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit{
  title = 'Create Company';
  validationMessages = {
    required: 'This field is required',
    min: 'The code should be greater than 0'
  };
  nameError = '';
  codeError = '';
  countryError= '';
  newCompanyForm = this.fb.nonNullable.group({
    code: [0, [Validators.required, Validators.min(0)]],
    name: ['', [Validators.required]],
    country: ['', [Validators.required]],
    active: [true, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Company,
  ) {
    if(this.data) {
      this.title = "Edit Company";
      this.newCompanyForm.get('code')?.setValue(this.data.code);
      this.newCompanyForm.get('name')?.setValue(this.data.name);
      this.newCompanyForm.get('country')?.setValue(this.data.country);
      this.newCompanyForm.get('active')?.setValue(this.data.active);
    }
  }

  ngOnInit() {
    const codeControl = this.newCompanyForm.get('code');
    const nameControl = this.newCompanyForm.get('name');
    const countryControl = this.newCompanyForm.get('country');
    codeControl?.valueChanges.subscribe(
      _ => {
        this.codeError = '';
        this.setMessage(codeControl, 'code')
      }
    );
    nameControl?.valueChanges.subscribe(
      _ => {
        this.nameError = '';
        this.setMessage(nameControl, 'name')
      }
    );
    countryControl?.valueChanges.subscribe(
      _ => {
        this.countryError = '';
        this.setMessage(countryControl, 'country')
      }
    );
  }

  setMessage(c: AbstractControl, controlName: keyof Company):void {
    if ((c.touched || c.dirty) && c.errors) {
      switch (controlName) {
        case 'code': {
          this.codeError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'name': {
          this.nameError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'country': {
          this.countryError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        default: console.log('error')
      }
    }
  }

  onSubmit() {
    if (this.newCompanyForm.valid) {
      const newCompany = {
        code: this.newCompanyForm.get('code')?.value,
        name: this.newCompanyForm.get('name')?.value,
        country: this.newCompanyForm.get('country')?.value,
        active: this.newCompanyForm.get('active')?.value,
      }
      this.dialogRef.close(newCompany);
      this.newCompanyForm.reset();
    }
  }
}
