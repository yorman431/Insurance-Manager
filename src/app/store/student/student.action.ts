import {createActionGroup, props} from '@ngrx/store';
import {Student} from '../../dashboard/sections/student/student';

export const studentAction = createActionGroup({
  source: 'Students',
  events: {
    'loadStudents': props<{ payload: Student[]}>(),
    'addStudent': props<Student>()
  }
})
