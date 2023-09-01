import { createFeature, createReducer, on } from '@ngrx/store';
import { CurseActions } from './curse.actions';
import {Curse} from '../curse';

export const curseFeatureKey = 'curse';

export const initialState: Curse[] = [];

export const reducer = createReducer(
  initialState,
  on(CurseActions.loadCurses, (state, {payload}) => {
    return payload
  }),
  on(CurseActions.addCurse, (state, curse) => {
    return [
      ...state,
      curse
    ]
  })
);

export const curseFeature = createFeature({
  name: curseFeatureKey,
  reducer,
});

