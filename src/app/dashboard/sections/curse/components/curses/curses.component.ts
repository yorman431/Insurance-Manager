import { Component } from '@angular/core';
import {Curse} from '../../curse';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CurseFormComponent} from '../curse-form/curse-form.component';
import {CurseService} from '../../services/curse.service';
import {Store} from '@ngrx/store';
import {selectCurseState} from '../../store/curse.selectors';

@Component({
  selector: 'app-curses',
  templateUrl: './curses.component.html',
  styleUrls: ['./curses.component.css']
})
export class CursesComponent {
  curses: Observable<Curse[]>
  constructor(
    private dialog: MatDialog,
    private curseService: CurseService,
    private store: Store) {
      this.curseService.loadCurses();
      this.curses = this.store.select(selectCurseState);
  }

  deleteCurse(curse: Curse): void {
    const text = `Are you sure you want to delete ${curse?.name}?`;
    if (confirm(text))
      this.curseService.deleteCurse(curse.id)
  }
  addCurse() {
    this.dialog
      .open(CurseFormComponent, {maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Curse) => {
          if (v) {
            this.curseService.createCurse(v);
          }
        }
      });
  }

  editCurse(curse: Curse) {
    this.dialog
      .open(CurseFormComponent, {data: curse, maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Curse) => {
          if (v) {
            this.curseService.editCurse(curse.id, v);
          }
        }
      });
  }
}
