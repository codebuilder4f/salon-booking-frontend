export enum ERole {
  ROLE_USER,
  ROLE_ADMIN
}
export interface User {
  id: number;
  email: string;
  password: string;
  roleList: ERole;
}
