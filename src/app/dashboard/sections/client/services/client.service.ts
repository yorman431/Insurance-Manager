import { Injectable } from '@angular/core';
import {Client} from '../client';
import {NotificationService} from '../../../../shared/service/notification.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environment/environment';
import {Store} from '@ngrx/store';
import {ClientActions} from '../store/client.actions';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private httpClient: HttpClient,
    private notification: NotificationService,
    private store: Store) { }

  loadCurses(): void {
    this.httpClient.get<Client[]>(environment.baseApiUrl + '/clients')
      .subscribe({
        next: (res) => this.store.dispatch(ClientActions.loadClients({payload: res})),
        error: () => this.notification.error('There was a problem loading clients')
      })
  }

  createCurse(newClient: Client) {
    this.httpClient.post<Client>(environment.baseApiUrl + '/clients', {...newClient})
      .subscribe({
        next: (client) => {
          this.store.dispatch(ClientActions.addClients(client));
          this.notification.success('New Client created')
        },
        error: () => this.notification.error('Error creating new client')
      })
  }

  editCurse(id: number, client: Client) {
    this.httpClient.put(environment.baseApiUrl + '/clients/' + id, client)
      .subscribe({
        next: () => {
          this.loadCurses();
          this.notification.success('Client Updated');
        },
        error: () => this.notification.error("The client can't be updated")
      })
  }

  deleteCurse(id: number) {
    this.httpClient.delete(environment.baseApiUrl + '/clients/' + id)
      .subscribe({
        next: () => {
          this.loadCurses();
          this.notification.success('Client deleted')
        },
        error: () => this.notification.error('Error deleting the client')
      })
  }
}
