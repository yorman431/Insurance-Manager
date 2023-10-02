import { createActionGroup, props } from '@ngrx/store';
import {Client} from '../client';

export const ClientActions = createActionGroup({
  source: 'Client',
  events: {
    'Load Clients': props<{payload: Client[]}>(),
    'add Clients': props<Client>(),
  }
});
