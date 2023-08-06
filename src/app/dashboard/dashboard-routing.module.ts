import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {StudentsComponent} from '../student/components/students/students.component';
import {CursesComponent} from '../curse/components/curses/curses.component';
import {SubjectsComponent} from '../subject/components/subjects/subjects.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'students',
        component: StudentsComponent,
        loadChildren: () => import('../student/students.module').then((m) => m.StudentsModule)
      },
      {
        path: 'curses',
        component: CursesComponent,
        loadChildren: () => import('../curse/curses.module').then((m) => m.CursesModule)
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
        loadChildren: () => import('../subject/subject.module').then((m) => m.SubjectModule)
      },
      {
        path: '**',
        redirectTo: 'students'
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
