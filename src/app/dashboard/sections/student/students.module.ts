import { NgModule } from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {StudentsComponent} from './components/students/students.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {StudentFormComponent} from './components/studentForm/studentForm.component';
import {MatIconModule} from '@angular/material/icon';
import { StudentTableComponent } from './components/student-table/student-table.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent,
    StudentTableComponent
  ],
  imports: [
    NgStyle,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    SharedModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  exports: [
    MatTableModule,
    StudentsComponent
  ]
})
export class StudentsModule { }
