import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from '../../subject';
import {SubjectService} from '../../services/subject.service';
import {SubjectFormComponent} from '../subject-form/subject-form.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  subjects: Observable<Subject[]>
  constructor(private dialog: MatDialog, private subjectService: SubjectService) {
    this.subjects = this.subjectService.getSubjects();
  }

  deleteSubject(subject: Subject): void {
    const text = `Are you sure you want to delete ${subject?.name}?`;
    if (confirm(text))
      this.subjectService.deleteSubject(subject.id)
  }
  addSubject() {
    this.dialog
      .open(SubjectFormComponent, {maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Subject) => {
          if (v) {
            this.subjectService.createSubject(v);
          }
        }
      });
  }

  editSubject(subject: Subject) {
    this.dialog
      .open(SubjectFormComponent, {data: subject, maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Subject) => {
          if (v) {
            this.subjectService.editSubject(subject.id, v);
          }
        }
      });
  }
}
