import {Role} from "./role";

export class User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  accessToken: string;

  constructor(id: string, name: string, email: string, roles: Role[], accessToken: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
    this.accessToken = accessToken;
  }
}
