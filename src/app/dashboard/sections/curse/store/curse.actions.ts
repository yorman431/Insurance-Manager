import { createActionGroup, props } from '@ngrx/store';
import {Curse} from '../curse';

export const CurseActions = createActionGroup({
  source: 'Curse',
  events: {
    'Load Curses': props<{payload: Curse[]}>(),
    'add Curse': props<Curse>(),
  }
});
