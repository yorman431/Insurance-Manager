import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import {InscriptionRelation} from "../inscription";
import {Student} from "../../student/student";
import {Client} from "../../client/client";

export const inscriptionFeatureKey = 'inscription';

export interface State {
  data: InscriptionRelation[],
  students: Student[],
  curses: Client[],
  error: unknown
}

export const initialState: State = {
  data: [],
  students: [],
  curses: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, state => state),
  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data
    }
  }),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(InscriptionActions.loadStudents, state => state),
  on(InscriptionActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: action.students
    }
  }),
  on(InscriptionActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(InscriptionActions.loadCurses, state => state),
  on(InscriptionActions.loadCursesSuccess, (state, action) => {
    return {
      ...state,
      curses: action.curses
    }
  }),
  on(InscriptionActions.loadCursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

