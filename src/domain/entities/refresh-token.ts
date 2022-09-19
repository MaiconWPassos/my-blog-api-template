import { v4 as uuid } from "uuid";

interface RefreshTokenProps {
  id?: string;
  expires_in: number;
  user_id: string;
}

export class RefreshToken {
  public props: RefreshTokenProps;

  get id() {
    return this.props.id;
  }

  get expires_in() {
    return this.props.expires_in;
  }

  get user_id() {
    return this.props.user_id;
  }

 
  constructor(props: RefreshTokenProps) {
  
    this.props = props;
  }
}
