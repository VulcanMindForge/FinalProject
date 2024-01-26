export class User {
  // email: string;
  id:number;
  username: string;
  password: string;
  enabled: boolean;
  role: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  sex: string;
  biography: string;
  imageUrl: string;

  constructor(
    // email: string = '',
    id:number=0,
    username: string = '',
    password: string = '',
    enabled: boolean = false,
    role: string = '',
    firstName: string = '',
    lastName: string = '',
    birthdate: string = '',
    sex: string = '',
    biography: string = '',
    imageUrl: string = ''
  ) {
    // this.email = email;
    this.id = id;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.sex = sex;
    this.biography = biography;
    this.imageUrl = imageUrl;
  }
}
