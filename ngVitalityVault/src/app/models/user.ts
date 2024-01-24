export class User {

    // email: string;
    username: string;
    password: string;
    enabled: boolean;
    role: string;

    constructor(
      // email: string = '',
      username: string = '',
      password: string = '',
      enabled: boolean = false,
      role: string = ''
    ) {
      // this.email = email;
      this.username = username;
      this.password = password;
      this.enabled = enabled;
      this.role = role;
    }
  }

