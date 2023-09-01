import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {StudentsComponent} from './sections/student/components/students/students.component';
import {CursesComponent} from './sections/curse/components/curses/curses.component';
import {SubjectsComponent} from './sections/subject/components/subjects/subjects.component';
import {InscriptionComponent} from './sections/inscription/components/inscription/inscription.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'students',
        component: StudentsComponent,
        loadChildren: () => import('./sections/student/students.module').then((m) => m.StudentsModule)
      },
      {
        path: 'curses',
        component: CursesComponent,
        loadChildren: () => import('./sections/curse/curses.module').then((m) => m.CursesModule)
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
        loadChildren: () => import('./sections/subject/subject.module').then((m) => m.SubjectModule)
      },
      {
        path: 'inscription',
        component: InscriptionComponent,
        loadChildren: () => import('./sections/inscription/inscription.module').then((m) => m.InscriptionModule)
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
