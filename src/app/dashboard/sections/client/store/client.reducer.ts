import { createFeature, createReducer, on } from '@ngrx/store';
import { ClientActions } from './client.actions';
import {Client} from '../client';

export const clientFeatureKey = 'client';

export const initialState: Client[] = [];

export const reducer = createReducer(
  initialState,
  on(ClientActions.loadClients, (state, {payload}) => {
    return payload
  }),
  on(ClientActions.addClients, (state, curse) => {
    return [
      ...state,
      curse
    ]
  })
);

export const clientFeature = createFeature({
  name: clientFeatureKey,
  reducer,
});

