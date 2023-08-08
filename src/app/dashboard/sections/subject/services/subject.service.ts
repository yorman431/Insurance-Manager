import { Injectable } from '@angular/core';
import {BehaviorSubject, map, mergeMap, Observable, take} from 'rxjs';
import {NotificationService} from '../../../../shared/service/notification.service';
import { Subject } from '../subject';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private _$subject = new BehaviorSubject<Subject[]>([]);
  private $subject = this._$subject.asObservable()
  constructor(private httpClient: HttpClient, private notification: NotificationService) { }

  loadSubject(): void {
    this.httpClient.get<Subject[]>(environment.baseApiUrl + '/subjects')
      .subscribe({
        next: (subjects) => this._$subject.next(subjects),
        error: () => this.notification.error('There was a problem loading Subjects')
      })
  }
  getSubjects(): Observable<Subject[]> {
    return this.$subject;
  }

  createSubject(newSubject: Subject) {
    this.httpClient.post<Subject>(environment.baseApiUrl + '/subjects', newSubject)
      .pipe(
        mergeMap((subject) => this.$subject.pipe(
          take(1),
          map(subjectArr => [...subjectArr, subject])
        ))
      )
      .subscribe({
        next: (subjects) => {
          this._$subject.next(subjects);
          this.notification.success('New Subject created')
        },
        error: () => this.notification.error('Error creating new subject')
      })
  }

  editSubject(id: number, subject: Subject) {
    this.httpClient.put(environment.baseApiUrl + '/subjects/' + id, subject)
      .subscribe({
        next: () => {
          this.loadSubject();
          this.notification.success('Subject updated');
        },
        error: () => this.notification.error("The subject can't be updated")
      })
  }

  deleteSubject(id: number) {
    this.httpClient.delete(environment.baseApiUrl + '/subjects/' + id)
      .subscribe({
        next: () => {
          this.loadSubject();
          this.notification.success('Subject deleted')
        },
        error: () => this.notification.error('Error deleting the subject')
      })
  }
}
