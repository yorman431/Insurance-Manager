import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from '../../subject';

@Component({
  selector: 'app-curse-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit{
  title = 'Create Subject';
  validationMessages = {
    required: 'This field is required',
  };
  nameError = '';
  categoryError = '';
  newSubjectForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    active: [true, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Subject,
  ) {
    if(this.data) {
      this.title = "Edit Subject";
      this.newSubjectForm.get('name')?.setValue(this.data.name);
      this.newSubjectForm.get('category')?.setValue(this.data.category);
      this.newSubjectForm.get('active')?.setValue(this.data.active);
    }
  }

  ngOnInit() {
    const nameControl = this.newSubjectForm.get('name');
    const categoryControl = this.newSubjectForm.get('capacity');
    nameControl?.valueChanges.subscribe(
      _ => {
        this.nameError = '';
        this.setMessage(nameControl, 'name')
      }
    );
    categoryControl?.valueChanges.subscribe(
      _ => {
        this.categoryError = '';
        this.setMessage(categoryControl, 'category')
      }
    );
  }

  setMessage(c: AbstractControl, controlName: keyof Subject):void {
    if ((c.touched || c.dirty) && c.errors) {
      switch (controlName) {
        case 'name': {
          this.nameError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'category': {
          this.categoryError = Object.keys(c.errors).map(
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
    if (this.newSubjectForm.valid) {
      const newSubject = {
        name: this.newSubjectForm.get('name')?.value,
        category: this.newSubjectForm.get('category')?.value,
        active: this.newSubjectForm.get('active')?.value,
      }
      this.dialogRef.close(newSubject);
      this.newSubjectForm.reset();
    }
  }
}
