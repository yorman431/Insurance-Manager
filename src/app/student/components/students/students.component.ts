import {Component} from '@angular/core';
import {Student} from '../../student';
import {MatDialog} from '@angular/material/dialog';
import {StudentFormComponent} from '../studentForm/studentForm.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.components.css']
})
export class StudentsComponent {
  students: Student[] = this.getStudents();
  columns = ['id', 'name', 'lastName', 'email', 'active', 'avgQualification', 'actions'];
  constructor(private dialog: MatDialog) {
  }

  getStudents(): Student[] {
    return [
      {id: 1, name: 'Carmen', lastName: 'Valenzuela', active: true, email: 'carmen@email.com', avgQualification: 3.4},
      {id: 2, name: 'Roy', lastName: 'Quintana', active: true, email: 'roy@email.com', avgQualification: 4.2},
      {id: 3, name: 'Rossi', lastName: 'Perez', active: true, email: 'rossi@email.com', avgQualification: 4.9},
      {id: 4, name: 'Robert', lastName: 'Rosas', active: true, email: 'robert@email.com', avgQualification: 3.7},
      {id: 5, name: 'Edgard', lastName: 'Moreno', active: false, email: 'edgard@email.com', avgQualification: 2.3},
      {id: 6, name: 'Maria', lastName: 'Marin', active: true, email: 'maria@email.com', avgQualification: 3.6},
      {id: 7, name: 'Fernando', lastName: 'Rodriguez', active: true, email: 'fernando@email.com', avgQualification: 4.2},
      {id: 8, name: 'Rocio', lastName: 'Caicuto', active: true, email: 'rocio@email.com', avgQualification: 4.6},
    ]
  }

  deleteStudent(id: number): void {
    const student = this.students.find(student => student.id === id);
    const text = `Are you sure you want to delete ${student?.name} ${student?.lastName}?`;
    if (confirm(text))
      this.students = this.students.filter((student) => student.id !== id);
  }

  addStudent() {
    this.dialog
      .open(StudentFormComponent, {maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Student) => {
          if (v) {
            this.students = [
              ...this.students,
              {
                id: this.students[this.students.length -1].id +1,
                name: v.name,
                lastName: v.lastName,
                email: v.email,
                active: v.active,
                avgQualification: v.avgQualification
              }
            ]
          }
        }
      });
  }

  editStudent(student: Student) {
    console.log(student);
    this.dialog
      .open(StudentFormComponent, {data: student, maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Student) => {
          if (v) {
            this.students = this.students.map(data => data.id === student.id ? {...data, ...v} : data)
          }
        }
      });
  }
}
