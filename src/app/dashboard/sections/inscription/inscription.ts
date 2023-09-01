import {Student} from "../student/student";
import {Curse} from "../curse/curse";

export interface Inscription {
  id: number,
  studentId: number,
  curseId: number,
  name: string,
  active: boolean
}

export interface InscriptionRelation extends Inscription {
  student: Student,
  curse: Curse
}
