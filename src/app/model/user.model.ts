export class UserDto {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  user_type: string;
  language: string;
}

export class User implements UserDto {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  user_type: string;
  language: string;

  constructor(json?: UserDto) {
    Object.assign(this, json);
  }

  getContentDisplay() {
    return `${this.first_name} ${this.last_name} - ${this.email} - ${this.user_type}`;
  }
}
