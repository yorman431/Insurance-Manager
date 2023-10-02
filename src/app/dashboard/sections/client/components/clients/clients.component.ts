import { Component } from '@angular/core';
import {Client} from '../../client';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ClientFormComponent} from '../client-form/client-form.component';
import {ClientService} from '../../services/client.service';
import {Store} from '@ngrx/store';
import {selectCurseState} from '../../store/client.selectors';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  clients: Observable<Client[]>
  constructor(
    private dialog: MatDialog,
    private clientService: ClientService,
    private store: Store) {
      this.clientService.loadCurses();
      this.clients = this.store.select(selectCurseState);
  }

  deleteClient(client: Client): void {
    const text = `Are you sure you want to delete ${client?.name} ${client?.lastName}?`;
    if (confirm(text))
      this.clientService.deleteCurse(client.id)
  }
  addClient() {
    this.dialog
      .open(ClientFormComponent, {maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Client) => {
          if (v) {
            this.clientService.createCurse(v);
          }
        }
      });
  }

  editClient(client: Client) {
    this.dialog
      .open(ClientFormComponent, {data: client, maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Client) => {
          if (v) {
            this.clientService.editCurse(client.id, v);
          }
        }
      });
  }
}
