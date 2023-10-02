import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Client} from '../../client';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent {
  @Input() clients: Client[] = [];
  @Output() delete = new EventEmitter<Client>();
  @Output() edit = new EventEmitter<Client>();
  columns = ['docNumber', 'name', 'telephone', 'email', 'actions'];

  deleteClient(client: Client) {
    this.delete.emit(client);
  }

  editClient(client: Client) {
    this.edit.emit(client);
  }
}
