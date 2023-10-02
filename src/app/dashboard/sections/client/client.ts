export interface Client {
  id: number
  name: string
  lastName: string
  docType: 'RIF' | 'RIF-G' | 'ID' | 'Passport'
  docNumber: string
  telephone: string | null
  email: string | null
  active: boolean
}
