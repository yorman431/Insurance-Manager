import {Component, OnInit} from '@angular/core';
import {Student} from './student';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.components.css']
})
export class StudentsComponent implements OnInit{
  students: Student[] = this.getStudents();
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
  constructor(private fb : FormBuilder) {
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

  getStudents(): Student[] {
    return [
      {name: 'Carmen', lastName: 'Valenzuela', active: true, email: 'carmen@email.com', avgQualification: 3.4},
      {name: 'Roy', lastName: 'Quintana', active: true, email: 'roy@email.com', avgQualification: 4.2},
      {name: 'Rossi', lastName: 'Perez', active: true, email: 'rossi@email.com', avgQualification: 4.9},
      {name: 'Robert', lastName: 'Rosas', active: true, email: 'robert@email.com', avgQualification: 3.7},
      {name: 'Edgard', lastName: 'Moreno', active: false, email: 'edgard@email.com', avgQualification: 2.3},
      {name: 'Maria', lastName: 'Marin', active: true, email: 'maria@email.com', avgQualification: 3.6},
      {name: 'Fernando', lastName: 'Rodriguez', active: true, email: 'fernando@email.com', avgQualification: 4.2},
      {name: 'Rocio', lastName: 'Caicuto', active: true, email: 'rocio@email.com', avgQualification: 4.6},
    ]
  }

  deleteStudent(index: number): void {
    const text = `Are you sure you want to delete ${this.students[index].name} ${this.students[index].lastName}?`;
    if (confirm(text))
      this.students = this.students.filter((_, i) => index !== i);
  }

  addNewStudent() {
    if (this.newStudentForm.valid){
      const newStudent = {
        name: this.newStudentForm.get('name')?.value,
        lastName: this.newStudentForm.get('lastName')?.value,
        email: this.newStudentForm.get('email')?.value,
        active: this.newStudentForm.get('active')?.value ,
        avgQualification: this.newStudentForm.get('avgQualification')?.value,
      }
      // @ts-ignore
      this.students.push(newStudent)
      this.newStudentForm.reset();
    }

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
}
