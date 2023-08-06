import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Curse} from '../../curse';

@Component({
  selector: 'app-curse-form',
  templateUrl: './curse-form.component.html',
  styleUrls: ['./curse-form.component.css']
})
export class CurseFormComponent implements OnInit{
  title = 'Create Curse';
  validationMessages = {
    required: 'This field is required',
    min: 'The value should be higher than 0',
  };
  nameError = '';
  capacityError = '';
  durationError = '';
  newCurseForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    capacity: [0, [Validators.required, Validators.min(0)]],
    duration: ['', Validators.required,],
    active: [true, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CurseFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Curse,
  ) {
    if(this.data) {
      this.title = "Edit Curse";
      this.newCurseForm.get('name')?.setValue(this.data.name);
      this.newCurseForm.get('capacity')?.setValue(this.data.capacity);
      this.newCurseForm.get('duration')?.setValue(this.data.duration || '' );
      this.newCurseForm.get('active')?.setValue(this.data.active);
    }
  }

  ngOnInit() {
    const nameControl = this.newCurseForm.get('name');
    const capacityControl = this.newCurseForm.get('capacity');
    const durationControl = this.newCurseForm.get('duration');
    nameControl?.valueChanges.subscribe(
      _ => {
        this.nameError = '';
        this.setMessage(nameControl, 'name')
      }
    );
    capacityControl?.valueChanges.subscribe(
      _ => {
        this.capacityError = '';
        this.setMessage(capacityControl, 'capacity')
      }
    );
    durationControl?.valueChanges.subscribe(
      _ => {
        this.durationError = '';
        this.setMessage(durationControl, 'duration')
      }
    );
  }

  setMessage(c: AbstractControl, controlName: keyof Curse):void {
    if ((c.touched || c.dirty) && c.errors) {
      switch (controlName) {
        case 'name': {
          this.nameError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'capacity': {
          this.capacityError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'duration': {
          this.durationError = Object.keys(c.errors).map(
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
    if (this.newCurseForm.valid) {
      const newCurse = {
        name: this.newCurseForm.get('name')?.value,
        capacity: this.newCurseForm.get('capacity')?.value,
        duration: this.newCurseForm.get('duration')?.value,
        active: this.newCurseForm.get('active')?.value,
      }
      this.dialogRef.close(newCurse);
      this.newCurseForm.reset();
    }
  }
}
