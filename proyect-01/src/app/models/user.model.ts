export interface User {
  id: number,
  email: string,
  password: string,
  name: string,
  // role: 'user' | 'admin',
}

export interface UserDTO extends Omit<User, 'id'> {  }
