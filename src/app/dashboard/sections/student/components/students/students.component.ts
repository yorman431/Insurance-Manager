import {Component} from '@angular/core';
import {Student} from '../../student';
import {MatDialog} from '@angular/material/dialog';
import {StudentFormComponent} from '../studentForm/studentForm.component';
import {StudentService} from '../../services/student.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectStudentSelector} from '../../../../../store/student/student.selector';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.components.css']
})
export class StudentsComponent {
  students: Observable<Student[]>

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService,
    private store: Store) {
      this.studentService.loadStudents();
      this.students = this.store.select(selectStudentSelector);
  }

  deleteStudent(student: Student): void {
    const text = `Are you sure you want to delete ${student?.name} ${student?.lastName}?`;
    if (confirm(text))
      this.studentService.deleteStudent(student.id)
  }

  addStudent() {
    this.dialog
      .open(StudentFormComponent, {maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Student) => {
          if (v) {
            this.studentService.createStudent(v);
          }
        }
      });
  }

  editStudent(student: Student) {
    this.dialog
      .open(StudentFormComponent, {data: student, maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Student) => {
          if (v) {
            this.studentService.editStudent(student.id, v);
          }
        }
      });
  }
}
