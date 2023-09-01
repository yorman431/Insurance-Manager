import {createReducer, on} from '@ngrx/store';
import {Student} from '../../dashboard/sections/student/student';
import {studentAction} from './student.action';

export const studentFeatureKey = 'student';

const initialState: Student[] = []
export const studentReducer = createReducer(
  initialState,
  on(studentAction.loadStudents, (state, {payload}) => {
    return payload
  }),
  on(studentAction.addStudent, (state, student) => {
    return [
      ...state,
      student
    ]
  })
)
