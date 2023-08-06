import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, take} from 'rxjs';
import {NotificationService} from '../../shared/service/notification.service';
import { Subject } from '../subject';

const SUBJECTS: Observable<Subject[]> = of([
  {id: 1, name: 'Angular', category: 'Develop', active: true},
  {id: 2, name: 'BackEnd', category: 'Develop', active: true},
]);

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private _$subject = new BehaviorSubject<Subject[]>([]);
  private $subject = this._$subject.asObservable()
  constructor(private notification: NotificationService) { }

  getSubjects(): Observable<Subject[]> {
    SUBJECTS.subscribe({
      next: (subject) => this._$subject.next(subject)
    });
    return this.$subject;
  }

  createSubject(newSubject: Subject) {
    this.$subject.pipe(take(1)).subscribe({
      next: (subject) => {
        this._$subject.next([
          ...subject,
          {
            id: (subject[subject.length -1]?.id || 0) +1,
            name: newSubject.name,
            category: newSubject.category,
            active: newSubject.active,
          }
        ])
      }
    })
    this.notification.success('New Subject created')
  }

  editSubject(id: number, subject: Subject) {
    this._$subject.pipe(take(1)).subscribe({
      next: (subjects) => {
        this._$subject.next(
          subjects.map(data => {
            return data.id === id ? {...data, ...subject} : data
          })
        )
      }
    });
    this.notification.success('Subject updated');
  }

  deleteSubject(id: number) {
    this._$subject.pipe(take(1)).subscribe({
      next: (subjects) => {
        this._$subject.next(
          subjects.filter((subject) => subject.id !== id)
        )
      }
    });
    this.notification.success('Subject deleted')
  }
}
