import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { ClientsComponent } from './components/clients/clients.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ClientTableComponent } from './components/client-table/client-table.component';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from '../../../shared/shared.module';
import { ClientFormComponent } from './components/client-form/client-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EffectsModule } from '@ngrx/effects';
import { ClientEffects } from './store/client.effects';
import {StoreModule} from '@ngrx/store';
import {clientFeature} from './store/client.reducer';
import { MatSelectModule } from "@angular/material/select";



@NgModule({
  declarations: [
    ClientsComponent,
    ClientTableComponent,
    ClientFormComponent
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
    StoreModule.forFeature( clientFeature ),
    EffectsModule.forFeature( [ ClientEffects ] ),
    MatSelectModule,
  ],
  exports:[
    MatTableModule,
    ClientsComponent
  ]
})
export class ClientModule { }
