import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Curse} from '../../curse';

@Component({
  selector: 'app-curse-table',
  templateUrl: './curse-table.component.html',
  styleUrls: ['./curse-table.component.css']
})
export class CurseTableComponent {
  @Input() curses: Curse[] = [];
  @Output() delete = new EventEmitter<Curse>();
  @Output() edit = new EventEmitter<Curse>();
  columns = ['id', 'name', 'capacity', 'duration', 'active', 'actions'];

  deleteCurse(curse: Curse) {
    this.delete.emit(curse);
  }

  editCurse(curse: Curse) {
    this.edit.emit(curse);
  }
}
