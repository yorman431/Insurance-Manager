import { Injectable } from '@angular/core';
import {Curse} from '../curse';
import {NotificationService} from '../../../../shared/service/notification.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environment/environment';
import {Store} from '@ngrx/store';
import {CurseActions} from '../store/curse.actions';

@Injectable({
  providedIn: 'root'
})
export class CurseService {

  constructor(
    private httpClient: HttpClient,
    private notification: NotificationService,
    private store: Store) { }

  loadCurses(): void {
    this.httpClient.get<Curse[]>(environment.baseApiUrl + '/curses')
      .subscribe({
        next: (res) => this.store.dispatch(CurseActions.loadCurses({payload: res})),
        error: () => this.notification.error('There was a problem loading curses')
      })
  }

  createCurse(newCurse: Curse) {
    this.httpClient.post<Curse>(environment.baseApiUrl + '/curses', {...newCurse})
      .subscribe({
        next: (curse) => {
          this.store.dispatch(CurseActions.addCurse(curse));
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
