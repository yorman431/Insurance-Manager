export interface Student {
  id: number,
  name: string,
  lastName: string,
  email?: string | undefined,
  active: boolean,
  avgQualification: number
}
