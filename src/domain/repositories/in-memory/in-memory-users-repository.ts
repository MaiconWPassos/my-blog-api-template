import { hash } from "bcryptjs";
import { User } from "../../entities/user";
import { UserRepository } from "../user-repository";

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  async create(user: User): Promise<User> {
    const passwordHash = await hash(user.password, 8);
    const newDataUser ={
      email: user.email,
      name: user.name,
      username: user.username,
      password: passwordHash

    }
    const newUser = new User(newDataUser)
    
    this.items.push(newUser);

    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }
}
