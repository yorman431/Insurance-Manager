import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import { SubjectTableComponent } from './components/subject-table/subject-table.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectFormComponent,
    SubjectTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  exports: [SubjectsComponent]
})
export class SubjectModule { }
