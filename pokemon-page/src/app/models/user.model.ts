export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  // role: 'user' | 'admin';
}

export interface UserDTO extends Omit<User, 'id'> {  }

export interface IUserProfile extends User {
  avatar: string;
  age: number;
  birthday: Date;
  region: string;
  hometown: string;
  class: string;
  range: string;
  level: number;
  exp: string;
  pokemonsCatched: number;
  pokemonTeam: number[]
}