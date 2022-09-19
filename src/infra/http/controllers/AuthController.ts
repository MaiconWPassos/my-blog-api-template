
import { AuthUser } from "domain/use-cases/authenticate-user";

import { Request, Response } from "express";
import { UsersRepository } from "infra/repositories/users-repository";
import { RefreshTokensRepository } from "infra/repositories/refresh-token-repository";


const userRepository = new UsersRepository();
const refreshTokensRepository = new RefreshTokensRepository();


export class AuthController {
  async create(req: Request, res: Response) {


      const {  email,password  } = req.body;
    

      const authUserUseCase = new AuthUser(userRepository, refreshTokensRepository)

      const { token, refreshToken, user } = await authUserUseCase.execute({ email , password})


      return res.send({ token, refreshToken: refreshToken.props, user: user.props})
      

    }
}
