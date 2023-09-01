import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Inscription, InscriptionRelation} from '../../inscription';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {InscriptionService} from '../../services/inscription.service';
import {InscriptionFormComponent} from '../inscription-form/inscription-form.component';
import {InscriptionActions} from "../../store/inscription.actions";
import {selectInscriptions} from "../../store/inscription.selectors";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit{
  inscription$: Observable<InscriptionRelation[]>

  constructor(
    private dialog: MatDialog,
    private inscriptionService: InscriptionService,
    private store: Store
  ) {
    this.inscription$ = this.store.select(selectInscriptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
  }

  deleteInscription(inscription: Inscription): void {
    const text = `Are you sure you want to delete ${inscription?.name}?`;
    if (confirm(text))
      this.store.dispatch(InscriptionActions.deleteInscription({ id: inscription.id}))
  }
  addInscription() {
    this.dialog
      .open(InscriptionFormComponent, {maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Inscription) => {
          if (v) {
            this.store.dispatch(InscriptionActions.createInscription({ payload: v }));
          }
        }
      });
  }

  editInscription(inscription: Inscription) {
    this.dialog
      .open(InscriptionFormComponent, {data: inscription, maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Inscription) => {
          if (v) {
            this.store.dispatch(InscriptionActions.updateInscription({id: inscription.id, payload: v}))
          }
        }
      });
  }
}
