import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { CursesComponent } from './components/curses/curses.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CurseTableComponent } from './components/curse-table/curse-table.component';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from '../../../shared/shared.module';
import { CurseFormComponent } from './components/curse-form/curse-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EffectsModule } from '@ngrx/effects';
import { CurseEffects } from './store/curse.effects';
import {StoreModule} from '@ngrx/store';
import {curseFeature} from './store/curse.reducer';



@NgModule({
  declarations: [
    CursesComponent,
    CurseTableComponent,
    CurseFormComponent
  ],
  imports: [
    NgStyle,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    StoreModule.forFeature(curseFeature),
    EffectsModule.forFeature([CurseEffects]),
  ],
  exports:[
    MatTableModule,
    CursesComponent
  ]
})
export class CursesModule { }
