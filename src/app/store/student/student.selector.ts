import {createFeatureSelector} from '@ngrx/store';
import {studentFeatureKey} from './student.reducer';
import {Student} from '../../dashboard/sections/student/student';

export const selectStudentSelector = createFeatureSelector<Student[]>(studentFeatureKey)
