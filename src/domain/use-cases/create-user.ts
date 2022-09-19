import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type CreateUserResponse = User;

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    username,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const emailInUse = await this.userRepository.findUserByEmail(email);

    if (emailInUse) {
      throw new Error("Another user already uses this email");
    }

    const user = new User({
      name,
      username,
      email,
      password,
    });

    await this.userRepository.create(user);

    return user;
  }
}
