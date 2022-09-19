import { User } from "../entities/user";
import { UserRepository } from "domain/repositories/user-repository";

interface FinUserByEmailRequest {
  email: string;
}

export type FinUserByEmailResponse = User;

export class FindUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: FinUserByEmailRequest): Promise<FinUserByEmailResponse> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("User does not exist");
    }

    return user;
  }
}
