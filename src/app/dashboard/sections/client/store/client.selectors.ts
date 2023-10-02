import { createFeatureSelector } from '@ngrx/store';
import { clientFeatureKey } from './client.reducer';
import {Client} from '../client';

export const selectCurseState = createFeatureSelector<Client[]>(
  clientFeatureKey
);
