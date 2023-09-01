import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Inscription, InscriptionRelation} from "../inscription";
import {HttpErrorResponse} from "@angular/common/http";
import {Student} from "../../student/student";
import {Curse} from "../../curse/curse";

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionRelation[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[]}>(),
    'Load Students Failure': props<{ error: HttpErrorResponse }>(),

    'Load Curses': emptyProps(),
    'Load Curses Success': props<{ curses: Curse[]}>(),
    'Load Curses Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ payload: Inscription}>(),
    'Create Inscription Success': emptyProps(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse}>(),

    'Update Inscription': props<{ id: number, payload: Inscription}>(),
    'Update Inscription Success': emptyProps(),
    'Update Inscription Failure': props<{ error: HttpErrorResponse}>(),

    'Delete Inscription': props<{ id: number }>(),
    'Delete Inscription Success': emptyProps(),
    'Delete Inscription Failure': props<{ error: HttpErrorResponse }>(),
  }
});
