import {Student} from "../student/student";
import {Client} from "../client/client";

export interface Inscription {
  id: number,
  studentId: number,
  curseId: number,
  name: string,
  active: boolean
}

export interface InscriptionRelation extends Inscription {
  student: Student,
  curse: Client
}
