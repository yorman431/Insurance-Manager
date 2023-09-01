import {ActionReducerMap} from '@ngrx/store';
import {studentFeatureKey, studentReducer} from './student/student.reducer';
import {Student} from '../dashboard/sections/student/student';

export interface AppState {
  [studentFeatureKey]: Student[]
}
export const appReducer: ActionReducerMap<AppState> = {
  [studentFeatureKey]: studentReducer
}
