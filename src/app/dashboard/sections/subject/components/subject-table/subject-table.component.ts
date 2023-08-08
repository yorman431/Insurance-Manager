import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from '../../subject';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.css']
})
export class SubjectTableComponent {
  @Input() subjects: Subject[] = [];
  @Output() delete = new EventEmitter<Subject>();
  @Output() edit = new EventEmitter<Subject>();
  columns = ['id', 'name', 'category', 'active', 'actions'];

  deleteSubject(subject: Subject) {
    this.delete.emit(subject);
  }

  editSubject(subject: Subject) {
    this.edit.emit(subject);
  }
}
