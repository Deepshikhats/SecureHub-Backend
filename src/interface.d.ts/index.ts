interface LoginUserCredentials {
  email: string;
  password: string;
}

interface SignupUserCredentials extends LoginUserCredentials {
  name: string;
}
