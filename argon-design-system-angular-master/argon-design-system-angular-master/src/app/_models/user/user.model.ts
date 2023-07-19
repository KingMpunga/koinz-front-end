import { JwtToken } from "../jwt/jwt-token.model";

export interface User {
  userId: number;
  email: string;
  password: string;
  createdOn: Date;
  isDeleted: boolean;
  isActve: boolean;
  token: JwtToken;
}