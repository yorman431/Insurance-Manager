import {Component} from '@angular/core';
import {Student} from './student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.components.css']
})
export class StudentsComponent {
  students: Student[];
  newStudent: Student = {
    name: '',
    lastName: '',
    active: true,
    avgQualification: 0
  };
  constructor() {
    this.students = this.getStudents();
  }

  getStudents(): Student[] {
    return [
      {name: 'Carmen', lastName: 'Valenzuela', active: true, birthday: new Date(1991, 7, 15), avgQualification: 3.4},
      {name: 'Roy', lastName: 'Quintana', active: true, birthday: new Date(1989, 5, 20), avgQualification: 4.2},
      {name: 'Rossi', lastName: 'Perez', active: true, birthday: new Date(1990, 1, 9), avgQualification: 4.9},
      {name: 'Robert', lastName: 'Rosas', active: true, birthday: new Date(1985, 11, 8), avgQualification: 3.7},
      {name: 'Edgard', lastName: 'Moreno', active: false, birthday: new Date(1994, 5, 30), avgQualification: 2.3},
      {name: 'Maria', lastName: 'Marin', active: true, birthday: new Date(1996, 6, 22), avgQualification: 3.6},
      {name: 'Fernando', lastName: 'Rodriguez', active: true, birthday: new Date(1987, 9, 1), avgQualification: 4.2},
      {name: 'Rocio', lastName: 'Caicuto', active: true, birthday: new Date(1987, 3, 17), avgQualification: 4.6},
    ]
  }

  deleteStudent(index: number): void {
    const text = `Are you sure you want to delete ${this.students[index].name} ${this.students[index].lastName}?`;
    if (confirm(text))
      this.students = this.students.filter((_, i) => index !== i);
  }
}
