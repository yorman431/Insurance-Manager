import { Injectable } from '@angular/core';
import {BehaviorSubject, map, mergeMap, Observable, take} from 'rxjs';
import {Curse} from '../curse';
import {NotificationService} from '../../../../shared/service/notification.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CurseService {
  private _$curse = new BehaviorSubject<Curse[]>([]);
  private $curse = this._$curse.asObservable()
  constructor(private httpClient: HttpClient, private notification: NotificationService) { }

  loadCurses(): void {
    this.httpClient.get<Curse[]>(environment.baseApiUrl + '/curses')
      .subscribe({
        next: (res) => this._$curse.next(res),
        error: () => this.notification.error('There was a problem loading curses')
      })
  }
  getCurses(): Observable<Curse[]> {
    return this.$curse;
  }

  createCurse(newCurse: Curse) {
    this.httpClient.post<Curse>(environment.baseApiUrl + '/curses', {...newCurse})
      .pipe(
        mergeMap((curse) => this.$curse.pipe(
          take(1),
          map( curseArr => [...curseArr, curse])
        ))
      )
      .subscribe({
        next: (curses) => {
          this._$curse.next(curses);
          this.notification.success('New Curse created')
        },
        error: () => this.notification.error('Error creating new curse')
      })
  }

  editCurse(id: number, curse: Curse) {
    this.httpClient.put(environment.baseApiUrl + '/curses/' + id, curse)
      .subscribe({
        next: () => {
          this.loadCurses();
          this.notification.success('Curse Updated');
        },
        error: () => this.notification.error("The curse can't be updated")
      })
  }

  deleteCurse(id: number) {
    this.httpClient.delete(environment.baseApiUrl + '/curses/' + id)
      .subscribe({
        next: () => {
          this.loadCurses();
          this.notification.success('Curse deleted')
        },
        error: () => this.notification.error('Error deleting the curse')
      })
  }
}