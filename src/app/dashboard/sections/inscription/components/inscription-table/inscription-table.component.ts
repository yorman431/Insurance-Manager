import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InscriptionRelation} from "../../inscription";

@Component({
  selector: 'app-inscription-table',
  templateUrl: './inscription-table.component.html',
  styleUrls: ['./inscription-table.component.css']
})
export class InscriptionTableComponent {
  @Input() inscriptions: InscriptionRelation[] = [];
  @Output() delete = new EventEmitter<InscriptionRelation>();
  @Output() edit = new EventEmitter<InscriptionRelation>();
  columns = ['id', 'name', 'student', 'curse', 'active', 'actions'];

  deleteInscription(inscription: InscriptionRelation) {
    this.delete.emit(inscription);
  }

  editInscription(inscription: InscriptionRelation) {
    this.edit.emit(inscription);
  }
}
