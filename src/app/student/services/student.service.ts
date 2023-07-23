import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, take} from 'rxjs';
import {Student} from '../student';
import {NotificationService} from '../../shared/service/notification.service';

const USERS: Observable<Student[]> = of([
  {id: 1, name: 'Carmen', lastName: 'Valenzuela', active: true, email: 'carmen@email.com', avgQualification: 3.4},
  {id: 2, name: 'Roy', lastName: 'Quintana', active: true, email: 'roy@email.com', avgQualification: 4.2},
  {id: 3, name: 'Rossi', lastName: 'Perez', active: true, email: 'rossi@email.com', avgQualification: 4.9},
  {id: 4, name: 'Robert', lastName: 'Rosas', active: true, email: 'robert@email.com', avgQualification: 3.7},
  {id: 5, name: 'Edgard', lastName: 'Moreno', active: false, email: 'edgard@email.com', avgQualification: 2.3},
  {id: 6, name: 'Maria', lastName: 'Marin', active: true, email: 'maria@email.com', avgQualification: 3.6},
  {id: 7, name: 'Fernando', lastName: 'Rodriguez', active: true, email: 'fernando@email.com', avgQualification: 4.2},
  {id: 8, name: 'Rocio', lastName: 'Caicuto', active: true, email: 'rocio@email.com', avgQualification: 4.6},
]);
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _$student = new BehaviorSubject<Student[]>([]);
  private $student = this._$student.asObservable()
  constructor(private notification: NotificationService) { }

  getStudents(): Observable<Student[]> {
    USERS.subscribe({
      next: (students) => this._$student.next(students)
    });
    return this.$student;
  }

  createStudent(newStudent: Student) {
    this._$student.pipe(take(1)).subscribe({
      next: (students) => {
        this._$student.next([
          ...students,
          {
            id: (students[students.length -1]?.id || 0) +1,
            name: newStudent.name,
            lastName: newStudent.lastName,
            email: newStudent.email,
            active: newStudent.active,
            avgQualification: newStudent.avgQualification
          }
        ])
      }
    })
    this.notification.success('New student created')
  }

  editStudent(id:number, student: Student) {
    this._$student.pipe(take(1)).subscribe({
      next: (students) => {
        this._$student.next(
          students.map(data => {
           return data.id === id ? {...data, ...student} : data
          })
        )
      }
    });
    this.notification.success('Student updated');
  }

  deleteStudent(id: number) {
    this._$student.pipe(take(1)).subscribe({
      next: (students) => {
        this._$student.next(
          students.filter((student) => student.id !== id)
        )
      }
    });
    this.notification.success('Student deleted')
  }
}
