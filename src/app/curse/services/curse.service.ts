import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, take} from 'rxjs';
import {Curse} from '../curse';
import {NotificationService} from '../../shared/service/notification.service';

const CURSES: Observable<Curse[]> = of([
  {id: 1, name: 'Angular', capacity: 40, duration: '10 Weeks', active: true},
  {id: 2, name: 'BackEnd', capacity: 30, duration: '32 Weeks', active: true},
]);

@Injectable({
  providedIn: 'root'
})
export class CurseService {
  private _$curse = new BehaviorSubject<Curse[]>([]);
  private $curse = this._$curse.asObservable()
  constructor(private notification: NotificationService) { }

  getCurses(): Observable<Curse[]> {
    CURSES.subscribe({
      next: (curses) => this._$curse.next(curses)
    });
    return this.$curse;
  }

  createCurse(newCurse: Curse) {
    this.$curse.pipe(take(1)).subscribe({
      next: (curses) => {
        this._$curse.next([
          ...curses,
          {
            id: (curses[curses.length -1]?.id || 0) +1,
            name: newCurse.name,
            capacity: newCurse.capacity,
            duration: newCurse.duration,
            active: newCurse.active,
          }
        ])
      }
    })
    this.notification.success('New Curse created')
  }

  editCurse(id: number, curse: Curse) {
    this._$curse.pipe(take(1)).subscribe({
      next: (curses) => {
        this._$curse.next(
          curses.map(data => {
            return data.id === id ? {...data, ...curse} : data
          })
        )
      }
    });
    this.notification.success('Curse updated');
  }

  deleteCurse(id: number) {
    this._$curse.pipe(take(1)).subscribe({
      next: (curses) => {
        this._$curse.next(
          curses.filter((curse) => curse.id !== id)
        )
      }
    });
    this.notification.success('Curse deleted')
  }
}
