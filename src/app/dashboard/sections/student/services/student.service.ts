import { Injectable } from '@angular/core';
import {Student} from '../student';
import {NotificationService} from '../../../../shared/service/notification.service';
import {environment} from '../../../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {studentAction} from '../../../../store/student/student.action';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private httpClient: HttpClient,
    private notification: NotificationService,
    private store: Store
  ) { }

  loadStudents(): void {
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
      .subscribe({
        next: (res) => this.store.dispatch(studentAction.loadStudents({payload: res})),
        error: () => this.notification.error('There was a problem loading students')
      })
  }

  createStudent(newStudent: Student) {
    this.httpClient.post<Student>(environment.baseApiUrl + '/students', {...newStudent})
      .subscribe({
        next: (student) => {
          this.store.dispatch(studentAction.addStudent(student))
          this.notification.success('New student created')
        },
        error: () => this.notification.error('Error creating new student')
      })
  }

  editStudent(id:number, student: Student) {
    this.httpClient.put(environment.baseApiUrl + '/students/' + id, student)
      .subscribe({
        next: () => {
          this.loadStudents();
          this.notification.success('Student updated');
        },
        error: () => this.notification.error("The student can't be updated")
      })
  }

  deleteStudent(id: number) {
    this.httpClient.delete(environment.baseApiUrl + '/students/' + id)
      .subscribe({
        next: () => {
          this.loadStudents();
          this.notification.success('Student deleted')
          },
        error: () => this.notification.error("Error deleting the student")
      })
  }
}
