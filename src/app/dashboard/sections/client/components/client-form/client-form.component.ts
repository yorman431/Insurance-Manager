import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../../client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit{
  title = 'Create Client';
  validationMessages = {
    required: 'This field is required',
    email: 'Please insert a valid email'
  };
  nameError = '';
  lastNameError = '';
  docTypeError = '';
  docNumberError = '';
  emailError = '';
  newClientForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    docType: ['', Validators.required,],
    docNumber: ['', Validators.required],
    telephone: [''],
    email: ['', [Validators.email]],
    active: [true, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Client,
  ) {
    if(this.data) {
      this.title = "Edit Client";
      this.newClientForm.get('name')?.setValue(this.data.name);
      this.newClientForm.get('lastName')?.setValue(this.data.lastName);
      this.newClientForm.get('docType')?.setValue(this.data.docType);
      this.newClientForm.get('docNumber')?.setValue(this.data.docNumber);
      this.newClientForm.get('telephone')?.setValue(this.data?.telephone || '');
      this.newClientForm.get('email')?.setValue(this.data?.email || '');
      this.newClientForm.get('active')?.setValue(this.data.active);
    }
  }

  ngOnInit() {
    const nameControl = this.newClientForm.get('name');
    const lastNameControl = this.newClientForm.get('lastName');
    const docTypeControl = this.newClientForm.get('docType');
    const docNumberControl = this.newClientForm.get('docNumber');
    const emailControl = this.newClientForm.get('email');

    nameControl?.valueChanges.subscribe(
      _ => {
        this.nameError = '';
        this.setMessage(nameControl, 'name')
      }
    );
    lastNameControl?.valueChanges.subscribe(
      _ => {
        this.lastNameError = '';
        this.setMessage(lastNameControl, 'lastName')
      }
    );
    docTypeControl?.valueChanges.subscribe(
      _ => {
        this.docTypeError = '';
        this.setMessage(docTypeControl, 'docType')
      }
    );
    docNumberControl?.valueChanges.subscribe(
      _ => {
        this.docNumberError = '';
        this.setMessage(docNumberControl, 'docNumber')
      }
    );
    emailControl?.valueChanges.subscribe(
      _ => {
        this.emailError = '';
        this.setMessage(emailControl, 'email');
      }
    )
  }

  setMessage(c: AbstractControl, controlName: keyof Client):void {
    if ((c.touched || c.dirty) && c.errors) {
      switch (controlName) {
        case 'name': {
          this.nameError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'lastName': {
          this.lastNameError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'docType': {
          this.docTypeError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'docNumber': {
          this.docNumberError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'email': {
          this.docNumberError = Object.keys(c.errors).map(
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
    if (this.newClientForm.valid) {
      const newClient = {
        name: this.newClientForm.get('name')?.value,
        lastName: this.newClientForm.get('lastName')?.value,
        docType: this.newClientForm.get('docType')?.value,
        docNumber: this.newClientForm.get('docNumber')?.value,
        telephone: this.newClientForm.get('telephone')?.value,
        email: this.newClientForm.get('email')?.value,
        active: this.newClientForm.get('active')?.value,
      }
      this.dialogRef.close(newClient);
      this.newClientForm.reset();
    }
  }
}
