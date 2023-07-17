import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Student} from '../../student';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-students',
  templateUrl: './studentForm.component.html',
  styleUrls: ['./studentForm.component.css']
})
export class StudentFormComponent implements OnInit {
  title = 'Create Student';
  validationMessages = {
    required: 'This field is required',
    min: 'The value should be higher than 0',
    max: 'The value should be less tan 5',
    email: 'Please enter a valid email'
  };
  nameError = '';
  lastNameError = '';
  avgQualificationError = '';
  emailError = '';
  newStudentForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    active: [true, Validators.required],
    avgQualification: [0, [Validators.required, Validators.min(0), Validators.max(5)]]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student,
  ) {
    if(this.data) {
      this.title = "Edit Student";
      this.newStudentForm.get('name')?.setValue(this.data.name);
      this.newStudentForm.get('lastName')?.setValue(this.data.lastName);
      this.newStudentForm.get('email')?.setValue(this.data.email || '' );
      this.newStudentForm.get('active')?.setValue(this.data.active);
      this.newStudentForm.get('avgQualification')?.setValue(this.data.avgQualification);
    }
  }

  ngOnInit() {
    const nameControl = this.newStudentForm.get('name');
    const lastNameControl = this.newStudentForm.get('lastName');
    const emailControl = this.newStudentForm.get('email');
    const avgQualificationControl = this.newStudentForm.get('avgQualification');
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
    emailControl?.valueChanges.subscribe(
      _ => {
        this.emailError = '';
        this.setMessage(emailControl, 'email')
      }
    );
    avgQualificationControl?.valueChanges.subscribe(
      _ => {
        this.avgQualificationError = '';
        this.setMessage(avgQualificationControl, 'avgQualification')
      }
    )
  }

  setMessage(c: AbstractControl, controlName: keyof Student):void {
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
        case 'email': {
          this.emailError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'avgQualification': {
          this.avgQualificationError = Object.keys(c.errors).map(
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
    if (this.newStudentForm.valid) {
      const newStudent = {
        name: this.newStudentForm.get('name')?.value,
        lastName: this.newStudentForm.get('lastName')?.value,
        email: this.newStudentForm.get('email')?.value,
        active: this.newStudentForm.get('active')?.value,
        avgQualification: this.newStudentForm.get('avgQualification')?.value,
      }
      this.dialogRef.close(newStudent);
      this.newStudentForm.reset();
    }
  }
}
