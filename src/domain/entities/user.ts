import { v4 as uuid } from 'uuid'
interface UserProps {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
}

export class User {
  public props: UserProps;


  get id() {
    return this.props.id;
  }
  
  get name() {
    return this.props.name;
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  constructor(props: UserProps) {
    if(!props.id){
      props.id = uuid()
    }
    this.props = props;
  }
}
