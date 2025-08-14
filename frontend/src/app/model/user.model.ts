// src/models/user.model.ts

export interface User {
  username: string;
  password?: string;
  email?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}
