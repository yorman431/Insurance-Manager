import { createFeatureSelector } from '@ngrx/store';
import { curseFeatureKey } from './curse.reducer';
import {Curse} from '../curse';

export const selectCurseState = createFeatureSelector<Curse[]>(
  curseFeatureKey
);
