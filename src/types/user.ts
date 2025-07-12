export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface RegisterForm {
  userId: string;
  password: string;
  name: string;
  email: string;
}

export interface LoginForm {
  userId: string;
  password: string;
}
