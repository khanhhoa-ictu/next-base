export interface ILogin {
    username: string;
    password: string;
    rememberMe?: boolean;
  }
  export interface ISignUp {
    username: string;
    password: string;
    confirm: string;
  }