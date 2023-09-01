import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { InscriptionTableComponent } from './components/inscription-table/inscription-table.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import {StoreModule} from '@ngrx/store';
import {inscriptionFeature} from './store/inscription.reducer';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    InscriptionComponent,
    InscriptionFormComponent,
    InscriptionTableComponent
  ],
    imports: [
        CommonModule,
        StoreModule.forFeature(inscriptionFeature),
        EffectsModule.forFeature([InscriptionEffects]),
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule
    ]
})
export class InscriptionModule { }
