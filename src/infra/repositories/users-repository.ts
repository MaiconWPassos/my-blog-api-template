import { hash } from "bcryptjs";
import { User } from "domain/entities/user";
import { UserRepository } from "domain/repositories/user-repository";
import prisma from "infra/config/prisma";

export class UsersRepository implements UserRepository {


  async create(user: User): Promise<User> {
    
    const passwordHash = await hash(user.password, 8);

    const dataUser = await prisma.user.create({
      data: {
        email: user.email,
        password: passwordHash,
        username: user.username,
        name: user.name,
      },
    });
    user.props = dataUser;
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) return null;

    return new User({ ...user });
  }
}
