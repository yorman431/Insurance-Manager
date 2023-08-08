export interface User {
  id: number,
  name: string,
  role: string,
  token: string,
  email: string,
  password: string
}

export interface Login {
  email: string | null,
  password: string | null
}
