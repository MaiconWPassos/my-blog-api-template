import { User } from "domain/entities/user";

export interface UserRepository {
  create(appointment: User): Promise<User>;

  findUserByEmail(email: string): Promise<User | null>;
}
