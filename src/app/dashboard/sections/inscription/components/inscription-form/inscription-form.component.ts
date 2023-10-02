import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inscription} from "../../inscription";
import {Store} from "@ngrx/store";
import {InscriptionActions} from "../../store/inscription.actions";
import {Observable} from "rxjs";
import {Student} from "../../../student/student";
import {Client} from "../../../client/client";
import {selectCurses, selectStudents} from "../../store/inscription.selectors";

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit{
  title = 'Create Inscription';
  validationMessages = {
    required: 'This field is required',
    min: 'The value should be higher than 0',
  };
  nameError = '';
  studentError = '';
  curseError = '';
  newInscriptionForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    studentId: [0, [Validators.required, Validators.min(1)]],
    curseId: [0, [Validators.required, Validators.min(1)]],
    active: [true, Validators.required],
  });
  students$: Observable<Student[]>
  curses$: Observable<Client[]>

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InscriptionFormComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data?: Inscription,
  ) {
    this.students$ = this.store.select(selectStudents);
    this.curses$ = this.store.select(selectCurses);

    if(this.data) {
      this.title = "Edit Inscription";
      this.newInscriptionForm.get('name')?.setValue(this.data.name);
      this.newInscriptionForm.get('studentId')?.setValue(this.data.studentId);
      this.newInscriptionForm.get('curseId')?.setValue(this.data.curseId);
      this.newInscriptionForm.get('active')?.setValue(this.data.active);
    }
  }

  ngOnInit() {
    this.store.dispatch(InscriptionActions.loadStudents());
    this.store.dispatch(InscriptionActions.loadCurses())
    const nameControl = this.newInscriptionForm.get('name');
    const studentControl = this.newInscriptionForm.get('studentId');
    const curseControl = this.newInscriptionForm.get('curseId');
    nameControl?.valueChanges.subscribe(
      _ => {
        this.nameError = '';
        this.setMessage(nameControl, 'name')
      }
    );
    studentControl?.valueChanges.subscribe(
      _ => {
        this.studentError = '';
        this.setMessage(studentControl, 'studentId')
      }
    );
    curseControl?.valueChanges.subscribe(
      _ => {
        this.curseError = '';
        this.setMessage(curseControl, 'curseId')
      }
    );
  }

  setMessage(c: AbstractControl, controlName: keyof Inscription):void {
    if ((c.touched || c.dirty) && c.errors) {
      switch (controlName) {
        case 'name': {
          this.nameError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'studentId': {
          this.studentError = Object.keys(c.errors).map(
            // @ts-ignore
            key => this.validationMessages[key]
          ).join(' ');
          break;
        }
        case 'curseId': {
          this.curseError = Object.keys(c.errors).map(
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
    if (this.newInscriptionForm.valid) {
      const newInscription = {
        name: this.newInscriptionForm.get('name')?.value,
        studentId: this.newInscriptionForm.get('studentId')?.value,
        curseId: this.newInscriptionForm.get('curseId')?.value,
        active: this.newInscriptionForm.get('active')?.value,
      }
      this.dialogRef.close(newInscription);
      this.newInscriptionForm.reset();
    }
  }
}
