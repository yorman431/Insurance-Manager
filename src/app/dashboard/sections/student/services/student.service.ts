import { Injectable } from '@angular/core';
import {BehaviorSubject, map, mergeMap, Observable, take} from 'rxjs';
import {Student} from '../student';
import {NotificationService} from '../../../../shared/service/notification.service';
import {environment} from '../../../../../environment/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _$student = new BehaviorSubject<Student[]>([]);
  private $student = this._$student.asObservable()
  constructor(private httpClient: HttpClient, private notification: NotificationService) { }

  loadStudents(): void {
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
      .subscribe({
        next: (res) => this._$student.next(res),
        error: () => this.notification.error('There was a problem loading students')
      })
  }
  getStudents(): Observable<Student[]> {
    return this.$student;
  }

  createStudent(newStudent: Student) {
    this.httpClient.post<Student>(environment.baseApiUrl + '/students', {...newStudent})
      .pipe(
        mergeMap((student) => this.$student.pipe(
          take(1),
          map( studentArr => [...studentArr, student])
        ))
      )
      .subscribe({
        next: (students) => {
          this._$student.next(students);
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
