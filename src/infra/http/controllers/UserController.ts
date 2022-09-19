import { CreateUser } from "domain/use-cases/create-user";
import { Request, Response } from "express";
import { UsersRepository } from "infra/repositories/users-repository";

const userRepository = new UsersRepository();

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password, username } = req.body;
    const createUserUseCase = new CreateUser(userRepository);

    const user = await createUserUseCase.execute({
      name,
      username,
      email,
      password,
    });
    delete user.props.password
    return res.send(user.props);
  }
}
