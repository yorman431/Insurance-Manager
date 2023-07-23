import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Student} from '../../../student';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  @Input() students: Student[] = [];
  @Output() delete = new EventEmitter<Student>();
  @Output() edit = new EventEmitter<Student>();
  columns = ['id', 'name', 'lastName', 'email', 'active', 'avgQualification', 'actions'];

  deleteStudent(student: Student) {
    this.delete.emit(student);
  }

  editStudent(student: Student) {
    this.edit.emit(student);
  }
}
